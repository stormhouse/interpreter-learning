import re
import Token

p = re.compile(r'''\s*(([a-z]+|<|\{|\}|\+|=)|(\d+)|((['"])(\\\5|.)*?\5))''')
str = '''foo = "foo"
sum = 0
i = 0
while i < 10 {
  sum = sum + i
  i = i + 1
}'''


# m = re.match(r'hello', 'hello world')
# print(m.group())

import io

class Lexer:
    def __init__(self):
        self.queue = []
        pass
    def getToken(self, str, lineNum):
        pos = 0
        endPos = len(str)
        while pos < endPos - 1:
            matcher = p.match(str, pos)
            t = matcher.group(1)
            t2 = matcher.group(2)
            token = None
            if t2:
                token = Token.TokenIdentifier(t, lineNum)
            t3 = matcher.group(3)
            if t3:
                token = Token.TokenNumber(t, lineNum)
            t4 = matcher.group(4)
            if t4:
                token = Token.TokenString(t, lineNum)
            pos = matcher.end()
            if token:
                self.queue.append(token)
        self.queue.append(Token.TokenIdentifier('\\n', lineNum))
    def readCode(self, code):
        buf = io.StringIO(str)
        hasMore = True
        lineNum = 0
        while hasMore:
            line = buf.readline()
            self.getToken(line, lineNum)
            lineNum += 1
            if line == '':
                hasMore = False

lexer = Lexer()
lexer.readCode(str)
for t in lexer.queue:
    print('=>', t.getText())

