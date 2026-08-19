import paramiko

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

nginx_conf = """server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _ 195.35.6.213 kama.aiqmanalytics.com;

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

# Write file to /tmp/kama-demo.conf first
sftp = client.open_sftp()
with sftp.file('/tmp/kama-demo.conf', 'w') as f:
    f.write(nginx_conf)
sftp.close()

cmd = f"""
echo '{password}' | sudo -S cp /tmp/kama-demo.conf /etc/nginx/sites-available/kama-demo
echo '{password}' | sudo -S ln -sf /etc/nginx/sites-available/kama-demo /etc/nginx/sites-enabled/00-kama-demo
echo '{password}' | sudo -S nginx -t
echo '{password}' | sudo -S systemctl reload nginx
"""

stdin, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))
client.close()
