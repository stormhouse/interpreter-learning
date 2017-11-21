# pylint: disable-all 
import socket
import time

HOST = '127.0.0.1'
PORT = 8001

# http://archive.oreilly.com/python/pythoncook2/solution6.html
def recvAll(the_socket, timeout=1):
  ''' receive all data available from the_socket, waiting no more than
      ``timeout'' seconds for new data to arrive; return data as string.'''
  # use non-blocking sockets
  the_socket.setblocking(0)
  total_data = []
  begin = time.time( )
  while True:
    # print('loop---->')
    ''' loop until timeout '''
    if total_data and time.time( )-begin > timeout:
      break     # if you got some data, then break after timeout seconds
    elif time.time( )-begin > timeout*2:
      break     # if you got no data at all yet, wait a little longer
    try:
      data = the_socket.recv(1)
      if data:
        total_data.append(data)
        begin = time.time( )       # reset start-of-wait time
      else:
        time.sleep(0.1)           # give data some time to arrive
    except:
      pass
  return total_data

class Proxy:
  def __init__(self, connection):
    self.connection = connection
  def handle(self):
    clientSock = self.connection.clientSock
    # host = self.connection.url
    host = 'www.baidu.com'
    port = 80
    # sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # sock.bind((host, port))
    # sock.listen(500)
    # while True:
    #   sock.connect((host, port))
    #   data = recvAll(sock)
      # clientSock.sendall(b''.join(data))
    clientSock.sendall(b'HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin:*\r\ncontent-type:text/html\r\n\r\ncontent<script>alert("hello")</script>')
    clientSock.close()

def getLine (data):
  line = []
  byteCurrent = b''
  byteNext = b''
  while len(data):
    byteCurrent = data.pop(0)
    # allData.append(byteCurrent)
    if byteCurrent == b'\r':
      byteNext = data.pop(0)
      if byteNext == b'\n':
        if len(line) == 0:
          line.append(byteCurrent)
          line.append(byteNext)
        break
      else:
        line.append(byteCurrent)
        line.append(byteNext)
    else:
      line.append(byteCurrent)

  return b''.join(line)

class Request:
  def __init__(self, firstLine, headers, body):
    fls = firstLine.decode('utf-8').split()
    self.method = fls[0]
    self.path = fls[1]
    self.protocol = fls[2]

    self.headers = {}
    for h in headers:
      hh = h.split(b':')
      self.headers[hh[0].decode('utf-8')] = hh[1].decode('utf-8')
    self.body = body

class Connection:
  def __init__(self, sock):
    self.clientSock = sock
    self.data = recvAll(sock)
    self.proxy = Proxy(self)
    firstLine, headers, body = self.parse()
    self.request = Request(firstLine, headers, body)
  def parse(self):
    firstLine = b''
    headers = []
    line = b''
    i = 0
    isBody = False
    body = []
    while True:
      line = getLine(self.data)
      if not line:
        break
      if i == 0:
        firstLine = line
      else:
        if isBody:
          body.append(line)
          continue
        if not line:
          break
        if line == b'\r\n':
          isBody = True
        else:
          headers.append(line)
      i += 1
    return (firstLine, headers, body)

  def handle(self):
    self.proxy.handle()
    # self.conn.sendall(b'HTTP/1.1 200 OK\r\ncontent-type:text/html\r\n\r\ncontent<script>alert("hello")</script>')
    # self.conn.close()
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


