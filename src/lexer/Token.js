import TokenType from './TokenType.js'

class Token {
  constructor (type, literal, row, column, index) {
    this.type = type
    this.literal = literal
    this.row = row
    this.column = column
    this.index = index
  }
  text () {
    switch (this.type) {
      case TokenType.PLUS:
      case TokenType.MINUS:
      case TokenType.STAR:
      case TokenType.SLASH:
      case TokenType.EQUAL:
        return ' ' + this.literal + ' '
      case TokenType.VAR:
      case TokenType.FUNCTION:
        return this.literal + ' '
      default:
    }
    return this.literal
  }
}
export default Token
