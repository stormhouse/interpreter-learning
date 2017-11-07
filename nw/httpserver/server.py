import os
from socket import *

from nw.httpserver.Proxy import Proxy

HOST = '0.0.0.0'
PORT = 8000
ADDR = (HOST, PORT)


status = '''HTTP/1.0 200 OK\r\n'''
headers = '''Content-Type: text/html
Server: SS\r\n\r\n'''

body = '''<html>
  <body>Hello World</body>
</html>
'''

proxy = Proxy()
class Request:
    def __init__(self, conn):
        self._connection = conn
        self._bytes = b''
        self.headers = {}
        pass
    def bytes(self, bytes):
        self._bytes += bytes
        arr = bytes.split(b'\r\n\r\n')

        if len(arr) == 2:
            self.body = arr[1]

        firstline_headers = arr[0].decode(encoding='utf8').split('\r\n')

        first_line = firstline_headers[0].split(' ')
        self.method = first_line[0]
        self.url = first_line[1]
        self.protocol = first_line[2]

        headers = firstline_headers[1:]
        for header in headers:
            (key, value) = header.split(':', 1)
            self.headers[key] = value

        info = self._bytes.decode(encoding='ISO-8859-1').split('\r\n')

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
    def send(self):
        self.proxy.send(self)
        # t = self._connection
        # t.send(status.encode(encoding='utf_8'))
        # t.send(headers.encode(encoding='utf_8'))
        # t.send('success'.encode(encoding='utf_8'))
        # t.close()

sock = socket(AF_INET, SOCK_STREAM)
sock.setsockopt(SOL_SOCKET, SO_REUSEPORT, 1)
sock.bind(ADDR)
sock.listen(5)

BUFFER_SIZE = 2048
while True:
    print('waiting for connecting... port: ', PORT)
    connection, client_address = sock.accept()
    request = Request(connection)
    try:
        while True:
            data = connection.recv(BUFFER_SIZE)
            if data:
                request.bytes(data)
                if len(data) < BUFFER_SIZE:
                    proxy.send(request)
                    # request.send()
            else:
                break

    except IOError:
        connection.close()
        # t.send(b'404')
        pass
sock.close()
