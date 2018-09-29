import Token from './Token.js'
import TokenType from './TokenType.js'

const isDigit = (c) => /\d/.test(c)
const isAlphabet = (c) => /[a-zA-Z_]/.test(c)

class Lexer {
  constructor (rawCode) {
    this.rawCode = rawCode
    this.row = 1
    this.column = 1
    this.start = 0
    this.current = 0
    this.tokens = []
  }
  lex () {
    while (!this.isAtEnd()) {
      const char = this.advance()
      switch (char) {
        case '\n':
          this.row++
          this.column = 1
        case '\t':
        case '\r':
        case ' ':
          this.start++
          break;
        case '(':
          this.addToken(TokenType.LEFT_BRACE); break
        case ')':
          this.addToken(TokenType.RIGHT_BRACE); break
        case '{':
          this.addToken(TokenType.LEFT_PAREN); break
        case '}':
          this.addToken(TokenType.RIGHT_PAREN); break
        case '<':
          this.addToken(this.isMatch('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break
        case '>':
          this.addToken(this.isMatch('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER_EQUAL)
          break
        case '&':
          if (this.isMatch('&')) {
            this.addToken(TokenType.AND)
            break
          }
        case '|':
          if (this.isMatch('|')) {
            this.addToken(TokenType.OR)
            break
          }
        case ';':
          this.addToken(TokenType.SEMICOLON); break
        case '=':
          this.addToken(TokenType.EQUAL); break
        case '+':
          this.addToken(TokenType.PLUS); break
        case '-':
          this.addToken(TokenType.MINUS); break
        case '*':
          this.addToken(TokenType.STAR); break
        case '/':
          if (this.isMatch('/')) {
            while (!this.isAtEnd() && this.peek() !== '\n') {
              this.advance()
            }
            this.addToken(TokenType.COMMENT)
          } else {
            this.addToken(TokenType.SLASH)
          }
          break
        case '\'':
          this.string()
          break
        default:
          if (isDigit(char)) {
            this.number()
          }
          if (isAlphabet(char)) {
            this.identifier()
          }
      }
    }
    this.addToken(TokenType.EOF)
    debugger
  }
  string () {
  }
  identifier () {
  }
  number () {
    while (!this.isAtEnd() && isDigit(this.peek())) {
        this.advance()
    }
    this.addToken(TokenType.NUMBER)
  }
  addToken (type) {
    const literal = this.rawCode.substring(this.start, this.current)
    const token = new Token(type, literal, this.row, this.column, this.tokens.length)
    this.tokens.push(token)
    this.start = this.current
    this.column++
  }
  peek () {
    if (this.isAtEnd()) return ''
    return this.rawCode[this.current]
  }
  peekNext () {
    if (this.current + 1 > this.rawCode.length) return ''
    return this.rawCode[this.current + 1]
  }
  advance () {
    const char = this.rawCode[this.current]
    this.current++
    return char
  }
  isMatch (char) {
    const result = this.rawCode[this.current] === char
    if (result) {
      this.current++
    }
    return result
  }
  isAtEnd () {
    return this.current >= this.rawCode.length
  }
}
export default Lexer
