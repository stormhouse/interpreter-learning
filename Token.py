class Token:
    EOL = '\\n'
    def __init__(self, line):
        self.lineNumber = line

token = Token(123)
print(token.lineNumber)
