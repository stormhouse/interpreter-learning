

from Lexer import Lexer
from Token import Token
from ast.ASTLeaf import ASTLeaf
from ast.NumberLiteral import NumberLiteral

try:
    lineNumber = 1
    file = open('./while.me', 'r')
    lexer = Lexer(file)
finally:
    if file:
        file.close()

for token in lexer.tokenList:
    print(token.getText())

class Element:
    def parse(self, lexer: Lexer, res):
        pass
    def match(self, lexer: Lexer) -> bool:
        pass

class AToken(Element):
    def __init__(self, type):
        self.factory = 123 # TODO
    def parse(self, lexer: Lexer, res: list):
        t = lexer.read()
        if self.test(t):
            leaf = 'left' #factory.make(t)
            res.append(leaf)
class NumToken(AToken):
    def __init__(self, type):
        AToken.__init__(self, type)
        # protected NumToken(Class<? extends ASTLeaf> type) { super(type); }
    def test(self, t: Token):
        return t.isNumber()
        # protected boolean test(Token t) { return t.isNumber(); }
class Leaf(Element):
    def __init__(self, pats):
        self.tokens = pats

    def parse(self, lexer: Lexer, res):
        # TODO
        pass
    def find(self, res, token: Token):
        # TODO
        pass
    def match(self, lexer: Lexer) -> bool:
        return False
class Skip(Leaf):
    def __init__(self, t):
        Leaf.__init__(self, t)
    # protected Skip(String[] t) { super(t); }
    # protected void find(List<ASTree> res, Token t) {}

class Parser:
    def __init__(self):
        self.elements = []
    @staticmethod
    def rule():
        return Parser()
    def number(self, number: ASTLeaf):
        self.elements.append(NumToken(number))
        return self
    def sep(self, pats):
        for pat in pats:
            self.elements.append(Skip(pat))
        return self

    def parse(self, lexer: Lexer):
        results = []
        for e in self.elements:
            e.parse(lexer, results);

        return [11]
        # return make(results)
        # return factory.make(results);

number = Parser.rule().number(NumberLiteral).sep(Token.EOL)
tree = number.parse(lexer)
print(number)
print(tree)
