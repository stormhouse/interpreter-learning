import os
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

class Request:
    def __init__(self, bytes):
        self._bytes = bytes
        info = self._bytes.decode(encoding='utf_8').split('\r\n')
        first_line = info.pop(0).split(' ')
        self._METHOD = first_line[0]
        self._URI = first_line[1]
        self._PROTOCOL = first_line[2]
        self._headers = {}
        for header in info:
            h = tuple(header.split(':'))
            if len(h) == 2:
                self._headers[h[0]] = h[1]

    def get_URI(self):
        return self._URI
    def get_headers(self):
        return self._headers




while True:
    print('waiting for connecting...')
    t, a = s.accept()
    try:
        data = t.recv(2048)
        req = Request(data)
        uri = req.get_URI()
        _headers = req.get_headers()
        if os.path.exists('.' + uri):
            f = open('.' + uri)
            text = f.read()
            print(data.decode(encoding="utf_8"))
            t.send(status.encode(encoding='utf_8'))
            t.send(headers.encode(encoding='utf_8'))
            t.send(text.encode(encoding='utf_8'))
        t.close()
    except IOError:
        t.send(b'404')
        t.close()

s.close()
