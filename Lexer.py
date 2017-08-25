import Token
import re


# http://blog.csdn.net/goodboy5201314/article/details/42642149

class Lexer:
    tokenList = []
    # 0 identifier
    # 1 number
    #
    p = re.compile('([0-9]+)|("(\\"|\\\\|\\n|[^"])*")|([a-zA-Z][a-zA-Z0-9]*)|(=)|(<)|({)|(})|(\n)')

    def __init__(self):
        pass

    def __init__(self, source_text):
        line_number = 1
        while line_number > 0:
            line_text = source_text.readline()
            text = line_text
            if text:
                m = self.p.search(text)
                while m:
                    gs = m.groups()
                    for index, el in enumerate(gs):
                        if el is not None :
                            self.add_token(index, el, line_number)
                            break
                    pos = m.span()[1]
                    text = text[pos:]
                    m = self.p.search(text)
                line_number = line_number + 1
            else:
                line_number = -1

    def add_token(self, type, token, line_number):
        if type == 0:
            self.tokenList.append(Token.NumToken(line_number, token))
        elif type == 1:
            self.tokenList.append(Token.StrToken(line_number, token))
        else:
            self.tokenList.append(Token.IdToken(line_number, token))

    def read(self):
        return self.tokenList.pop()
    def __repr__(self):
        return self.tokenList


if __name__ == '__main__':
    try:
        lineNumber = 1
        # file = open('./var.me', 'r')
        file = open('./while.me', 'r')
        lexer = Lexer(file)
    finally:
        if file:
            file.close()

    for token in lexer.tokenList:
        print(token)
