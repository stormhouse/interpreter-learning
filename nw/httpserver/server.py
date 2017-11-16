import os


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

import socket
import ssl
import time

# http://archive.oreilly.com/python/pythoncook2/solution6.html
def recv_all(the_socket, timeout=1):
    ''' receive all data available from the_socket, waiting no more than
        ``timeout'' seconds for new data to arrive; return data as string.'''
    # use non-blocking sockets
    the_socket.setblocking(0)
    total_data = b''
    begin = time.time( )
    while True:
        ''' loop until timeout '''
        if total_data and time.time( )-begin > timeout:
            break     # if you got some data, then break after timeout seconds
        elif time.time( )-begin > timeout*2:
            break     # if you got no data at all yet, wait a little longer
        try:
            data = the_socket.recv(4096)
            if data:
                total_data += data
                begin = time.time( )       # reset start-of-wait time
            else:
                time.sleep(0.1)           # give data some time to arrive
        except:
            pass
    # return ''.join(total_data)
    return total_data

BUFFER_SIZE = 2048
class Proxy:
    def send(self, request):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        url = request.url
        host = ''
        port = 80
        if request.method == 'CONNECT':
            if 'chanjet' in request.url:
                self.doConnect(request)

        if 'https' in url:
            port = 443
            host = url.replace('https://', '')
            hosts = host.split('/')
            host = hosts[0]
        if ':443' in url:
            port = 443
            host = url.replace('https://', '')
            host = host.replace(':443', '')
            hosts = host.split('/')
            host = hosts[0]
        else:
            host = url.replace('http://', '')
            hosts = host.split('/')
            host = hosts[0]
        # host = 'www.iteye.com'
        server_address = (host, port)
        # print('connecting to {} port {}'.format(host, port))
        sock.settimeout(2)
        if port == 443:
            sock = ssl.wrap_socket(sock, ssl_version=ssl.PROTOCOL_TLSv1)
        sock.connect(server_address)
        data = b''

        try:
            message = request._bytes
            sock.sendall(message)

            while True:
                buffer = sock.recv(BUFFER_SIZE)
                data += buffer
                if (len(buffer) < BUFFER_SIZE):
                    break
        finally:
            sock.close()

        print('raw data ->:', data)
        connection = request._connection
        connection.sendall(data)
        connection.close()
    def doConnect(self, request):
        clientSock = request._connection
        address = (request.url.split(':')[0], int(request.url.split(':')[1]))
        print('connect: ', address)
        serverSock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        serverSock.settimeout(4)
        # 尝试连接
        try:
            serverSock.connect(address)
        except socket.error:
            # conn.sendall("/1.1" + str(arg[0]) + " Fail\r\n\r\n")
            # conn.sendall("/1.1" + str(" Fail\r\n\r\n"))
            clientSock.sendall(b"/1.1 Fail\r\n\r\n")
            clientSock.close()
            serverSock.close()
        else:  # 若连接成功
            clientSock.sendall(b'HTTP/1.1 200 Connection established\r\n\r\n')
            # 数据缓冲区
            # 读取浏览器给出的消息
            try:
                times = 0
                while True:
                    print('while')
                    # 从客户端读取数据，并转发给conn
                    # serverSock.sendall(request._bytes)
                    # data = clientSock.recv(99999)
                    data = recv_all(clientSock)
                    l = len(data)
                    if l == 0:
                        times += 1
                        time.sleep(0.1)
                        if times > 10:
                            break
                        else:
                            continue
                    times = 0
                    print('client recv -> : ', l, data)

                    serverSock.sendall(data)
                    # 从服务器读取回复，转发回客户端
                    # data2 = serverSock.recv(999999)
                    data2 = recv_all(serverSock)
                    ll = len(data2)
                    print('server recv ->: ', ll, data2)
                    clientSock.sendall(data2)
            except socket.error as e:
                print(e)
                clientSock.close()
                serverSock.close()
        print('connect-end: ', address)
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

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
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
