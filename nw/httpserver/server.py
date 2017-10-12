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
        asciiStr = bytes.decode(encoding='ISO-8859-1')
        first_line = asciiStr.split('\r\n')[0]
        if '---WebKitFormBoundary' in first_line:
            info = asciiStr.split('\r\n')
            infoBytes = [ _.encode('ISO-8859-1') for _ in info]
            file = infoBytes[4]
            f = open('file.png', 'wb')
            f.write(file)
            f.close()
            print(info)

            pass

        else:
            info = self._bytes.decode(encoding='ISO-8859-1').split('\r\n')
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
        try:
            return self._URI
        except AttributeError:
            return ''
    def get_headers(self):
        try:
            return self._headers
        except AttributeError:
            return ''


# class SimpleHTTPRequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
#     pass

while True:
    print('waiting for connecting...')
    t, a = s.accept()
    try:
        while True:
            data = t.recv(5000)
            if data:
                req = Request(data)
                uri = req.get_URI()
                _headers = req.get_headers()
                if uri == '/upload':
                    _d = None

                elif os.path.exists('.' + uri):
                    f = open('.' + uri)
                    text = f.read()
                    print(data.decode(encoding="utf_8"))
                    t.send(status.encode(encoding='utf_8'))
                    t.send(headers.encode(encoding='utf_8'))
                    t.send(text.encode(encoding='utf_8'))
                    t.close()
                else:
                    t.close()
            else:
                break

    except IOError:
        # t.send(b'404')
        t.close()

s.close()
