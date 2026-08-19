import paramiko
import time
import sys

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

fix_cmd = f"""
export PATH=$PATH:/usr/bin:/usr/local/bin

echo "=== 1. REBUILDING NATIVE BETTER-SQLITE3 BINDINGS ON UBUNTU ==="
cd /opt/kama-demo
npm rebuild better-sqlite3

echo "=== 2. RUNNING PRISMA SEED ==="
npx prisma db seed

echo "=== 3. RESTARTING PM2 PROCESS ==="
pm2 restart kama-demo
pm2 list

echo "=== 4. UPDATING NGINX SITE CONFIG FOR DIRECT IP & DEFAULT SERVER ==="
cat << 'EOF' | echo '{password}' | sudo -S tee /etc/nginx/sites-available/kama-demo
server {{
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _ 195.35.6.213 kama.aiqmanalytics.com spc.aiqmanalytics.com;

    client_max_body_size 50M;

    location / {{
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }}
}}
EOF

echo '{password}' | sudo -S ln -sf /etc/nginx/sites-available/kama-demo /etc/nginx/sites-enabled/kama-demo
echo '{password}' | sudo -S nginx -t
echo '{password}' | sudo -S systemctl reload nginx

echo "=== 5. VERIFYING PRODUCTION DEPLOYMENT & ENDPOINTS ==="
sleep 2

echo "A. Homepage HTTP Response (Port 3002):"
curl -sI http://127.0.0.1:3002 | head -n 5

echo -e "\nB. Processes API Response (Port 3002):"
curl -s http://127.0.0.1:3002/api/processes | head -c 250
echo ""

echo -e "\nC. Public Nginx HTTP Response (IP 195.35.6.213):"
curl -sI http://195.35.6.213 | head -n 5

echo -e "\nD. Public Nginx Processes API Response (IP 195.35.6.213):"
curl -s http://195.35.6.213/api/processes | head -c 250
echo ""

echo -e "\nE. Public Nginx Dashboard Stats API Response (IP 195.35.6.213):"
curl -s http://195.35.6.213/api/dashboard/stats
echo ""
"""

run_cmd(client, fix_cmd)
client.close()
print("\n✅ VPS FINAL FIX & VERIFICATION COMPLETED SUCCESSFULLY!")
