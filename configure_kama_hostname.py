import paramiko
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

nginx_conf = """server {
    listen 80;
    server_name kama-demo.aiqmanalytics.com 195.35.6.213;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)

# 1. Write file to /tmp/kama-demo.conf
sftp = client.open_sftp()
with sftp.file('/tmp/kama-demo.conf', 'w') as f:
    f.write(nginx_conf)
sftp.close()

# 2. Update sites-available and sites-enabled (clean up 00-kama-demo symlink)
cmd = f"""
export PATH=$PATH:/usr/bin:/usr/local/bin

echo "=== 1. CLEANING UP OLD SYMLINKS ==="
echo '{password}' | sudo -S rm -f /etc/nginx/sites-enabled/00-kama-demo /etc/nginx/sites-enabled/kama-demo

echo "=== 2. INSTALLING KAMA DEDICATED HOSTNAME SERVER BLOCK ==="
echo '{password}' | sudo -S cp /tmp/kama-demo.conf /etc/nginx/sites-available/kama-demo
echo '{password}' | sudo -S ln -sf /etc/nginx/sites-available/kama-demo /etc/nginx/sites-enabled/kama-demo

echo "=== 3. TESTING NGINX CONFIGURATION ==="
echo '{password}' | sudo -S nginx -t
echo '{password}' | sudo -S systemctl reload nginx

echo "=== 4. VERIFYING HOST HEADER ROUTING ON PORT 80 ==="
echo "A. Request with Host: kama-demo.aiqmanalytics.com:"
curl -sI -H "Host: kama-demo.aiqmanalytics.com" http://127.0.0.1:80 | head -n 5

echo -e "\nB. API Processes Request with Host: kama-demo.aiqmanalytics.com:"
curl -s -H "Host: kama-demo.aiqmanalytics.com" http://127.0.0.1:80/api/processes | head -c 200
echo ""

echo -e "\nC. Request with Host: spc.aiqmanalytics.com (Verifying existing site untouched):"
curl -sI -H "Host: spc.aiqmanalytics.com" http://127.0.0.1:80 | head -n 5

echo -e "\nD. Request with Host: exam.aiqmanalytics.com (Verifying existing site untouched):"
curl -sI -H "Host: exam.aiqmanalytics.com" http://127.0.0.1:80 | head -n 5
"""

stdin, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))
client.close()
