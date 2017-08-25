from Token import Token
from ast.ASTree import ASTree


class ASTLeaf(ASTree):
    def __init__(self, t: Token):
        self.token = t
    def child(self, i: int):
        pass
    def numChildren(self):
        return 0
    def toString(self):
        return self.token.getText()
    def location(self):
        return 'at line: ' + self.token.getLineNumber()
    def token(self):
        return self.token

