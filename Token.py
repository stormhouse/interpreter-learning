# 词法分析（lexical analyzer)后的最小单元
# Token，字符串、类型、行号等信息
# 类型：整型字面量、字符串字面量、标识符
from enum import Enum

TOKEN_TYPE = Enum('TYPE', ('IDENTIFIER', 'NUMBER'))

class Token:
    EOL = '\\n'
    # EOF = Token(-1)

    def __init__(self, lineNumber: int):
        self.lineNumber = lineNumber

    def getLineNumber(self):
        return self.lineNumber
    def getNumber(self):
        return ''
    def getText(self):
        return self.text

    def isIdentifier(self):
        return False
    def isNumber(self):
        return False
    def isString(self):
        return False
    def __repr__(self):
        # print(self.__class__.__name__)
        text = ''
        if self.lineNumber == -1:
            text = 'EOF'
        elif self.text and self.text == '\n':
            text = '\\n'
        else:
            text = str(self.text)
        return text + '    line: '+ str(self.lineNumber) + '    ' + str(self.__class__.__name__)
Token.EOF = Token(-1)


class NumToken(Token):
    def __init__(self, lineNumber, text):
        Token.__init__(self, lineNumber)
        self.value = text
    def isNumber(self):
        return True
    def getText(self):
        return str(self.value)
    def getNumber(self):
        return self.value

class StrToken(Token):
    def __init__(self, lineNumber, text):
        Token.__init__(self, lineNumber)
        self.literal = text
    def isString(self):
        return True
    def getText(self):
        return self.literal

class IdToken(Token):
    def __init__(self, lineNumber, text):
        Token.__init__(self, lineNumber)
        self.text = text
    def isIdentifier(self):
        return True
    def getText(self):
        return self.text


if __name__ == '__main__':
    number = NumToken(123, 1)
    string = StrToken('foo', 1)
    identifier = IdToken('var', 1)
    print(number)
    print(string)
    print(identifier)

    print(Token.EOL)
    print(Token.EOF)

