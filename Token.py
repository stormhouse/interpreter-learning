class Token:
    EOL = '\\n'
    def __init__(self, line):
        self.EOL = 'qq'
        self.lineNumber = line
    def isIdentifier(self):
        return False

token = Token(123)
print(token.lineNumber)
print(token.EOL)
print(Token.EOL)
print(Token.isIdentifier)
print(token.isIdentifier)
print(token.isIdentifier())
