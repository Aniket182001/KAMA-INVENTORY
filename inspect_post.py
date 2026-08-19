import paramiko

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

cmd = """
curl -i -X POST \
  -H "Host: kama-demo.aiqmanalytics.com" \
  -H "Content-Type: application/json" \
  -d '{"customerId":"CUST-TEST-99","name":"Test Customer"}' \
  http://127.0.0.1:80/api/customers
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
stdin, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode('utf-8', errors='replace'))
client.close()
