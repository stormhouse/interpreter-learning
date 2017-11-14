import socket
import ssl

BUFFER_SIZE = 2048
class Proxy:
    def send(self, request):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        url = request.url
        host = ''
        port = 80
        if request.method == 'CONNECT':
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
        print('connecting to {} port {}'.format(host, port))
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

        print(data)
        connection = request._connection
        connection.sendall(data)
        connection.close()
    def doConnect(self, request):
        conn = request._connection
        address = (request.url.split(':')[0], int(request.url.split(':')[1]))
        soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # soc.settimeout(4)
        # 尝试连接
        try:
            soc.connect(address)
        except socket.error:
            # conn.sendall("/1.1" + str(arg[0]) + " Fail\r\n\r\n")
            conn.sendall("/1.1" + str(" Fail\r\n\r\n"))
            conn.close()
            soc.close()
        else:  # 若连接成功
            conn.sendall(b'HTTP/1.1 200 Connection established\r\n\r\n')
            # 数据缓冲区
            # 读取浏览器给出的消息
            try:
                while True:
                    # 从客户端读取数据，并转发给conn
                    data = conn.recv(99999)
                    soc.sendall(data)
                    # 从服务器读取回复，转发回客户端
                    data = soc.recv(999999)
                    conn.sendall(data)
            except:
                conn.close()
                soc.close()

        print('11')
        pass

