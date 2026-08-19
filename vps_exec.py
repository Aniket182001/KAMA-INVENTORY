import paramiko
import sys

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

command = sys.argv[1] if len(sys.argv) > 1 else 'uname -a'

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
    
    stdin, stdout, stderr = client.exec_command(command)
    out = stdout.read().decode('utf-8')
    err = stderr.read().decode('utf-8')
    
    if out:
        print("STDOUT:\n" + out)
    if err:
        print("STDERR:\n" + err)
        
    client.close()
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
