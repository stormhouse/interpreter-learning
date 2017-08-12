# 词法分析（lexical analyzer)后的最小单元
# Token，字符串、类型、行号等信息
# 类型：整型字面量、字符串字面量、标识符
from enum import Enum

TOKEN_TYPE = Enum('TYPE', ('IDENTIFIER', 'NUMBER'))

class Token:
    EOL = '\\n'
    # EOF = Token(-1)

    def __init__(self, lineNumber):
        self.lineNumber = lineNumber
    def getLineNumber(self):
        return self.lineNumber
    def getText(self):
        return self.text
    def isNumber(self):
        return False
    def isString(self):
        return False
    def isIdentifier(self):
        return False
    def __repr__(self):
        # print(self.__class__.__name__)
        if self.lineNumber == -1:
            return 'EOF'
        return str(self.text) + '    line: '+ str(self.lineNumber) + '    ' + str(self.__class__.__name__)
Token.EOF = Token(-1)


class TokenNumber(Token):
    def __init__(self, text, lineNumber):
        Token.__init__(self, lineNumber)
        self.text = text
    def isNumber(self):
        return True

class TokenString(Token):
    def __init__(self, text, lineNumber):
        Token.__init__(self, lineNumber)
        self.text = text
    def isString(self):
        return True

class TokenIdentifier(Token):
    def __init__(self, text, lineNumber):
        Token.__init__(self, lineNumber)
        self.text = text
    def isIdentifier(self):
        return True


if __name__ == '__main__':
    number = TokenNumber(123, 1)
    string = TokenString('foo', 1)
    identifier = TokenIdentifier('var', 1)
    print(number)
    print(string)
    print(identifier)

    print(Token.EOL)
    print(Token.EOF)

