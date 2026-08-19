import paramiko
import time

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

def run_cmd(client, cmd, ignore_error=False):
    print(f"\n>>> EXECUTING:\n{cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    out_chunks = []
    err_chunks = []
    
    while not stdout.channel.exit_status_ready():
        if stdout.channel.recv_ready():
            chunk = stdout.channel.recv(4096).decode('utf-8')
            print(chunk, end='', flush=True)
            out_chunks.append(chunk)
        if stdout.channel.recv_stderr_ready():
            chunk = stdout.channel.recv_stderr(4096).decode('utf-8')
            print(chunk, end='', flush=True)
            err_chunks.append(chunk)
        time.sleep(0.1)

    while stdout.channel.recv_ready():
        chunk = stdout.channel.recv(4096).decode('utf-8')
        print(chunk, end='', flush=True)
        out_chunks.append(chunk)
    while stdout.channel.recv_stderr_ready():
        chunk = stdout.channel.recv_stderr(4096).decode('utf-8')
        print(chunk, end='', flush=True)
        err_chunks.append(chunk)

    code = stdout.channel.recv_exit_status()
    print(f"\n[Exit code: {code}]")
    if code != 0 and not ignore_error:
        raise Exception(f"Command failed with exit code {code}: {cmd}")
    return "".join(out_chunks), "".join(err_chunks)

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=hostname, port=port, username=username, password=password, timeout=30)

    print("Connected to VPS 195.35.6.213. Starting automated deployment...")

    # Step 1: Install Node.js LTS and PM2 if not present
    node_setup_cmd = f"""
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js 20 LTS via NodeSource..."
        echo '{password}' | sudo -S bash -c "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -"
        echo '{password}' | sudo -S apt-get install -y nodejs build-essential
    fi
    if ! command -v pm2 &> /dev/null; then
        echo "Installing PM2 globally..."
        echo '{password}' | sudo -S npm install -g pm2
    fi
    export PATH=$PATH:/usr/bin:/usr/local/bin
    node -v
    npm -v
    pm2 -v
    """
    run_cmd(client, node_setup_cmd)

    # Step 2: Prepare /opt/kama-demo directory
    prep_dir_cmd = f"""
    echo '{password}' | sudo -S mkdir -p /opt/kama-demo
    echo '{password}' | sudo -S chown -R aniket:aniket /opt/kama-demo
    """
    run_cmd(client, prep_dir_cmd)

    # Step 3: Clone or pull latest repository
    git_cmd = """
    if [ -d "/opt/kama-demo/.git" ]; then
        echo "Updating existing repository..."
        cd /opt/kama-demo && git fetch origin && git reset --hard origin/main
    else
        echo "Cloning repository..."
        rm -rf /opt/kama-demo/* /opt/kama-demo/.* 2>/dev/null || true
        git clone https://github.com/Aniket182001/KAMA-INVENTORY.git /opt/kama-demo
    fi
    """
    run_cmd(client, git_cmd)

    # Step 4: Environment & DB Setup
    env_db_cmd = """
    export PATH=$PATH:/usr/bin:/usr/local/bin
    cd /opt/kama-demo
    cat << 'EOF' > .env
DATABASE_URL="file:./dev.db"
PORT=3002
NODE_ENV=production
EOF

    npm install
    npx prisma generate
    npx prisma db push
    npx prisma db seed
    """
    run_cmd(client, env_db_cmd)

    # Step 5: Build Next.js application
    build_cmd = """
    export PATH=$PATH:/usr/bin:/usr/local/bin
    cd /opt/kama-demo
    npm run build
    """
    run_cmd(client, build_cmd)

    # Step 6: Start/Restart PM2 process
    pm2_cmd = f"""
    export PATH=$PATH:/usr/bin:/usr/local/bin
    cd /opt/kama-demo
    pm2 delete kama-demo 2>/dev/null || true
    pm2 start npm --name "kama-demo" -- start -- -p 3002
    pm2 save
    pm2 list
    """
    run_cmd(client, pm2_cmd)

    # Step 7: Configure Nginx site
    nginx_cmd = f"""
    cat << 'EOF' | echo '{password}' | sudo -S tee /etc/nginx/sites-available/kama-demo
server {{
    listen 80;
    server_name 195.35.6.213 kama.aiqmanalytics.com;

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
    """
    run_cmd(client, nginx_cmd)

    # Step 8: Verification
    verify_cmd = """
    echo "=== INTERNAL ACCESS TEST (Port 3002) ==="
    curl -sI http://127.0.0.1:3002 | head -n 10

    echo -e "\n=== API WORK CENTRES TEST ==="
    curl -s http://127.0.0.1:3002/api/processes | head -c 200
    echo ""

    echo -e "\n=== NGINX PROXY ACCESS TEST ==="
    curl -sI http://127.0.0.1:80 | head -n 10
    """
    run_cmd(client, verify_cmd)

    client.close()
    print("\n✅ DEPLOYMENT COMPLETED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
