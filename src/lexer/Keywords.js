import TokenType from './TokenType.js'

const Keywords = {
  'true'  : TokenType.TURE,
  'false' : TokenType.FALSE,
  'var'   : TokenType.VAR,
  'print' : TokenType.PRINT,
  'if'    : TokenType.IF,
  'else'  : TokenType.ELSE,
  'while' : TokenType.WHILE,
}
export default Keywords
