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
  STAR         : Symbol('star'),
  SLASH        : Symbol('slash'),

  COMMENT      : Symbol('comment'),
  STRING       : Symbol('string'),
  NUMBER       : Symbol('number'),
  TURE         : Symbol('true'),
  FALSE        : Symbol('false'),
  IDENTIFIER   : Symbol('identifier'),

  VAR          : Symbol('var'),
  ASSIGN       : Symbol('assign'),
  IF           : Symbol('if'),
  ELSE         : Symbol('else'),
  WHILE        : Symbol('while'),
  PRINT        : Symbol('print'),
  EOF          : Symbol('eof'),
}
export default TokenType
