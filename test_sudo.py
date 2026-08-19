import paramiko

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

cmd = "echo Aniket@1805 | sudo -S -v && echo 'SUDO SUCCESS' || echo 'SUDO FAILED'"

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
    
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode('utf-8')
    print(out)
    client.close()
except Exception as e:
    print(f"ERROR: {e}")
