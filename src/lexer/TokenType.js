const TokenType = {
  LEFT_PAREN   : Symbol('left_paren'),
  RIGHT_PAREN  : Symbol('right_paren'),
  LEFT_BRACE   : Symbol('left_brace'),
  RIGHT_BRACE  : Symbol('right_brace'),

  LESS         : Symbol('less'),
  LESS_EQUAL   : Symbol('less_equal'),
  GREATER      : Symbol('greater'),
  GREATER_EQUAL: Symbol('greater_equal'),

  AND          : Symbol('and'),
  OR           : Symbol('or'),

  SEMICOLON    : Symbol('semicolon'),
  EQUAL        : Symbol('equal'),

  PLUS         : Symbol('plus'),
  MINUS        : Symbol('minus'),
  STAR         : Symbol('start'),
  SLASH        : Symbol('slash'),

  COMMENT      : Symbol('comment'),
  STRING       : Symbol('string'),
  NUMBER       : Symbol('number'),
  EOF          : Symbol('eof'),
}
export default TokenType
