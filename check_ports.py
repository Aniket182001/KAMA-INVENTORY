import socket
import paramiko

hostname = 'spc.aiqmanalytics.com'
ports = [22, 2222, 22022, 1022, 22222]

for port in ports:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(3)
        res = s.connect_ex((hostname, port))
        s.close()
        print(f"Port {port}: {'OPEN' if res == 0 else 'CLOSED'}")
    except Exception as e:
        print(f"Port {port}: ERROR ({e})")
