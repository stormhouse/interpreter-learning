import socket

BUFFER_SIZE = 2048
class Proxy:
    def send(self, request):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        url = request.url
        host = url.replace('http://', '')
        hosts = host.split('/')
        host = hosts[0]
        # host = 'www.iteye.com'
        port = 80
        server_address = (host, port)
        print('connecting to {} port {}'.format(host, port))
        sock.settimeout(2)
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

