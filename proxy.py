import socket

HOST = '127.0.0.1'
PORT = 8001

class Connection:
  def __init__(self, conn):
    self.conn = conn
    self.data = conn.recv(4096)
  def handle(self):
    self.conn.sendall(b'HTTP/1.1 200 OK\r\ncontent-type:text/html\r\n\r\ncontent<script>alert("hello")</script>')
    self.conn.close()
class Server:
  def __init__(self, host, port):
    self.host = host
    self.port = port
  def start(self):
    self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    self.sock.bind((self.host, self.port))
    self.sock.listen(500)
    print('Listening at port: ', self.port)
    while True:
      conn, address = self.sock.accept()
      connection = Connection(conn)
      connection.handle()

server = Server(HOST, PORT)
server.start()


