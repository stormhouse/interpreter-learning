import TokenType from '../lexer/TokenType.js'

const color1 = '#B8B8B8'

const ColorMap = {
  [TokenType.NUMBER]: '#A4f6B7',
  [TokenType.STRING]: '#F08B5A',
  [TokenType.VAR]: '#9A81D3',
  [TokenType.IDENTIFIER]: '#5FABCE',

  [TokenType.PLUS]: color1,
  [TokenType.MINUS]: color1,
  [TokenType.STAR]: color1,
  [TokenType.SLASH]: color1,
}
export default ColorMap
