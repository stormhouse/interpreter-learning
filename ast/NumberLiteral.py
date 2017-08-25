from Token import Token
from ast.ASTLeaf import ASTLeaf


class NumberLiteral(ASTLeaf):
    def __init__(self, t: Token):
        super(t)
    def value(self):
        return self.token.getNumber()