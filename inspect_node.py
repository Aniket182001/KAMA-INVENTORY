import paramiko

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

inspect_cmd = """
echo "=== NVM / NODE CHECK ==="
ls -la ~/.nvm/ 2>/dev/null || echo "No .nvm in home"
ls -la ~/.nvm/versions/node/ 2>/dev/null || true
ls -la /usr/local/bin/node /usr/bin/node /root/.nvm/ 2>/dev/null || true

echo "=== USER HOME & PM2 ==="
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm current 2>/dev/null || true
node -v 2>/dev/null || echo "node still not found"
npm -v 2>/dev/null || echo "npm still not found"
pm2 list 2>/dev/null || echo "pm2 still not found"

echo "=== EXISTING SITES CONF ==="
cat /etc/nginx/sites-available/aiqm-spc 2>/dev/null | head -n 30 || true
cat /etc/nginx/sites-available/exam-portal 2>/dev/null | head -n 30 || true
"""

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
    
    stdin, stdout, stderr = client.exec_command(inspect_cmd)
    print(stdout.read().decode('utf-8'))
    client.close()
except Exception as e:
    print(f"ERROR: {e}")
