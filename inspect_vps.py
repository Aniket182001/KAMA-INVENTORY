import paramiko

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

inspect_cmd = """
echo "=== 1. OS & KERNEL ==="
lsb_release -a 2>/dev/null || cat /etc/os-release
uname -a

echo -e "\n=== 2. CPU & RAM ==="
lscpu | grep "CPU(s):" | head -n 2
free -h

echo -e "\n=== 3. DISK STORAGE ==="
df -h / /opt

echo -e "\n=== 4. NODE, NPM & PM2 ==="
which node npm pm2 git nginx psql mysql || true
node -v 2>/dev/null || echo "Node not in path"
npm -v 2>/dev/null || echo "npm not in path"
pm2 -v 2>/dev/null || echo "PM2 not in path"
pm2 list 2>/dev/null || echo "PM2 list unavailable"

echo -e "\n=== 5. LISTENING PORTS ==="
sudo ss -tulpn 2>/dev/null || ss -tulpn

echo -e "\n=== 6. NGINX SITES ==="
ls -la /etc/nginx/sites-enabled/ 2>/dev/null || echo "No sites-enabled"
ls -la /etc/nginx/conf.d/ 2>/dev/null || echo "No conf.d"

echo -e "\n=== 7. /opt PERMISSIONS ==="
ls -ld /opt
"""

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
    
    stdin, stdout, stderr = client.exec_command(inspect_cmd)
    out = stdout.read().decode('utf-8')
    err = stderr.read().decode('utf-8')
    
    print(out)
    if err:
        print("STDERR:\n" + err)
        
    client.close()
except Exception as e:
    print(f"ERROR: {e}")
