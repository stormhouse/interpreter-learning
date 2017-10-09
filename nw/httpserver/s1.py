from socket import *

HOST = '0.0.0.0'
PORT = 8000
ADDR = (HOST, PORT)

s = socket(AF_INET, SOCK_STREAM)
s.setsockopt(SOL_SOCKET, SO_REUSEPORT, 1)
s.bind(ADDR)
s.listen(5)

status = '''HTTP/1.0 200 OK\r\n'''
headers = '''Content-Type: text/html
Server: SS\r\n\r\n'''

body = '''<html>
  <body>Hello World</body>
</html>
'''

while True:
    print('waiting for connecting...')
    t, a = s.accept()
    print('from: ', a)
    try:
        data = t.recv(2048)
        print(data)
        t.send(status.encode(encoding='utf_8'))
        t.send(headers.encode(encoding='utf_8'))
        t.send(body.encode(encoding='utf_8'))
        t.close()
    except IOError:
        t.send(b'404')
        t.close()

s.close()



