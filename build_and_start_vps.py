import paramiko
import time
import sys

# Ensure UTF-8 output printing on Windows terminal
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

def run_cmd(client, cmd):
    print(f"\n>>> EXECUTING:\n{cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    while not stdout.channel.exit_status_ready():
        if stdout.channel.recv_ready():
            text = stdout.channel.recv(4096).decode('utf-8', errors='replace')
            sys.stdout.write(text)
            sys.stdout.flush()
        if stdout.channel.recv_stderr_ready():
            text = stdout.channel.recv_stderr(4096).decode('utf-8', errors='replace')
            sys.stdout.write(text)
            sys.stdout.flush()
        time.sleep(0.1)

    while stdout.channel.recv_ready():
        text = stdout.channel.recv(4096).decode('utf-8', errors='replace')
        sys.stdout.write(text)
        sys.stdout.flush()
    while stdout.channel.recv_stderr_ready():
        text = stdout.channel.recv_stderr(4096).decode('utf-8', errors='replace')
        sys.stdout.write(text)
        sys.stdout.flush()

    code = stdout.channel.recv_exit_status()
    print(f"\n[Exit code: {code}]")
    if code != 0:
        raise Exception(f"Command failed with exit code {code}")

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=hostname, port=port, username=username, password=password, timeout=30)

cmd = """
export PATH=$PATH:/usr/bin:/usr/local/bin:$HOME/.nvm/versions/node/v20.20.2/bin
cd /opt/kama-demo

echo "=== 1. INSTALLING NPM DEPENDENCIES ==="
npm install

echo "=== 2. PRISMA SETUP & SEEDING ==="
npx prisma generate
npx prisma db push
npx prisma db seed

echo "=== 3. BUILDING NEXT.JS APPLICATION ==="
npm run build

echo "=== 4. STARTING PM2 PROCESS ==="
pm2 delete kama-demo 2>/dev/null || true
pm2 start npm --name "kama-demo" -- start -- -p 3002
pm2 save
pm2 list

echo "=== 5. NGINX REVERSE PROXY CONFIGURATION ==="
cat << 'EOF' | echo 'Aniket@1805' | sudo -S tee /etc/nginx/sites-available/kama-demo
server {
    listen 80;
    server_name 195.35.6.213 kama.aiqmanalytics.com;

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
EOF

echo 'Aniket@1805' | sudo -S ln -sf /etc/nginx/sites-available/kama-demo /etc/nginx/sites-enabled/kama-demo
echo 'Aniket@1805' | sudo -S nginx -t
echo 'Aniket@1805' | sudo -S systemctl reload nginx

echo "=== 6. VERIFYING APP & ENDPOINTS ==="
sleep 3
echo "Internal Port 3002 Response:"
curl -sI http://127.0.0.1:3002 | head -n 5

echo -e "\nProcesses API Response:"
curl -s http://127.0.0.1:3002/api/processes | head -c 150
echo ""

echo -e "\nNginx Public Port 80 Response:"
curl -sI http://195.35.6.213 | head -n 5
"""

run_cmd(client, cmd)
client.close()
print("\n✅ VPS BUILD AND DEPLOYMENT COMPLETE!")
