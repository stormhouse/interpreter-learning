# 词法分析（lexical analyzer)后的最小单元
# Token，字符串、类型、行号等信息
# 类型：标识符、整型字面量、字符串字面量

class Token:
    EOL = '\\n'

    def __init__(self, lineNumber):
        self.lineNumber = lineNumber
    def getLineNumber(self):
        return self.lineNumber
    def getText(self):
        return self.str
    def isIdentifier(self):
        return False
    def isNumber(self):
        return False
    def isString(self):
        return False

class TokenIdentifier(Token):
    def __init__(self, str, lineNumber):
        Token.__init__(self, lineNumber)
        self.str = str
    def isIdentifier(self):
        return True
    def toString(self):
        return self.str + str(self.lineNumber)
class TokenNumber(Token):
    def __init__(self, str, lineNumber):
        Token.__init__(self, lineNumber)
        self.str = str
    def isNumber(self):
        return True
    def toString(self):
        return self.str + str(self.lineNumber)

class TokenString(Token):
    def __init__(self, str, lineNumber):
        Token.__init__(self, lineNumber)
        self.str = str
    def isString(self):
        return True
    def toString(self):
        return self.str + str(self.lineNumber)


