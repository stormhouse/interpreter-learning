import TokenType from '../lexer/TokenType.js'
import {
  StmtVar,
  StmtAssign,
  StmtPrint,
  StmtExpr,
  StmtBlock,
  StmtFunction,
  StmtCall,
} from './Stmt.js'
import {
  ExprVariable,
  ExprLiteral,
  ExprUnary,
  ExprBinary,
} from './Expr.js'

/*
statment       --> var | function | print | block | assign | exprStmt
var            --> "var" IDENTIFIER ("=" expression)? ";"
function       --> "function" IDENTIFIER "(" parameters? ")" block
print          --> "print(" expression ");"
block          --> "{" statment* "}"
assign         --> IDENTIFIER "=" expression ";"
parameters     --> IDENTIFIER ("," IDENTIFIER)*
exprStmt       --> expression ";"
expression     --> addition
addition       --> multiplication ("+" | "-") multiplication | multiplication
multiplication --> unary ("*" | "/") unary | unary
unary          --> call | "-" unary | primary
primary        --> "(" expression ")" | "true" | "false" | NUMBER | STRING

*/
class Parser {
  constructor (tokens) {
    this.tokens = tokens
    this.current = 0
    this.ss = []
  }
  parse () {
    while (!this.isAtEnd() && !this.check(TokenType.EOF)) {
      // this.ss.push(this.expression())
      this.ss.push(this.statement())
    }
    return this.ss
  }
  statement () {
    if (this.isMatch(TokenType.VAR)) {
      return this.var()
    }
    if (this.isMatch(TokenType.FUNCTION)) {
      return this.function()
    }
    if (this.isMatch(TokenType.PRINT)) {
      return this.print()
    }
    if (this.isMatch(TokenType.LEFT_BRACE)) {
      return this.block()
    }
    if (this.check(TokenType.IDENTIFIER) && this.checkNext(TokenType.EQUAL)) {
      return this.assign()
    }
    return this.exprStmt()
  }
  var () {
    if (this.isMatch(TokenType.IDENTIFIER)) {
      const name = this.previous()
      let value
      if (this.isMatch(TokenType.EQUAL)) {
        value = this.expression()
      }
      this.consume(TokenType.SEMICOLON, 'expected ; at the end of statement')
      return new StmtVar(name, value)
    } else {
      throw Error('expected variable name')
    }
  }
  function () {
    const v = this.consume(TokenType.IDENTIFIER, 'expected function name')
    this.consume(TokenType.LEFT_PAREN)
    let args = []
    if (!this.check(TokenType.RIGHT_PAREN)) {

    }
    this.consume(TokenType.RIGHT_PAREN)
    this.consume(TokenType.LEFT_BRACE)
    const stmt = this.block()
    return new StmtFunction(v, args, stmt)
  }
  print () {
    this.consume(TokenType.LEFT_PAREN, 'expected (')
    const expr = this.expression()
    this.consume(TokenType.RIGHT_PAREN, 'expected )')
    this.consume(TokenType.SEMICOLON, 'expected ;')
    return new StmtPrint(expr)
  }
  block () {
    const stmts = []
    while (!this.check(TokenType.RIGHT_BRACE)) {
      stmts.push(this.statement())
    }
    this.consume(TokenType.RIGHT_BRACE, 'expected } at the end of block')
    return new StmtBlock(stmts)
  }
  assign () {
    this.consume(TokenType.IDENTIFIER)
    const name = this.previous()
    this.consume(TokenType.EQUAL)
    const expr = this.expression()
    this.consume(TokenType.SEMICOLON, 'expected ;')
    return new StmtAssign(name, expr)
  }
  exprStmt () {
    let expr = this.expression()
    this.consume(TokenType.SEMICOLON, 'expected ;')
    return new StmtExpr(expr)
  }
  expression () {
    const expr = this.addtion()
    if (this.isMatch(TokenType.IDENTIFIER) ) {
      return new ExprVariable(this.previous())
    }
    return expr
  }
  addtion () {
    let expr = this.multiplication()
    // loop vs recursive
    while (this.isMatch([TokenType.PLUS, TokenType.MINUS])) {
      expr = new ExprBinary(this.previous(), expr, this.multiplication())
    }
    // if (this.isMatch([TokenType.PLUS, TokenType.MINUS])) {
    //   return new ExprBinary(this.previous(), expr, this.addtion())
    // }
    return expr
  }
  multiplication () {
    let expr = this.unary()
    // loop or recursive
    while (this.isMatch([TokenType.STAR, TokenType.SLASH])) {
      expr = new ExprBinary(this.previous(), expr, this.unary())
    }
    // if (this.isMatch([TokenType.STAR, TokenType.SLASH])) {
    //   return new ExprBinary(this.previous(), expr, this.multiplication())
    // }
    return expr
  }
  unary () {
    if (this.isMatch(TokenType.MINUS)) {
      return new ExprUnary(this.previous(), this.unary())
    }
    if (this.checkNext(TokenType.LEFT_PAREN)) {
      return this.call()
    }
    const expr = this.primary()
    return expr
  }
  call () {
    const name = this.consume(TokenType.IDENTIFIER)
    this.consume(TokenType.LEFT_PAREN)
    const args = []
    if (!this.check(TokenType.RIGHT_PAREN)) {

    }
    this.consume(TokenType.RIGHT_PAREN)
    return new StmtCall(name, args)
  }
  primary () {
    let expr
    if (this.isMatch(TokenType.TURE)) {
      return new ExprLiteral('true')
    }
    if (this.isMatch(TokenType.FALSE)) {
      return new ExprLiteral('false')
    }
    if (this.isMatch([TokenType.NUMBER, TokenType.STRING])) {
      return new ExprLiteral(this.previous().literal)
    }
    if (this.isMatch(TokenType.LEFT_PAREN)) {
      expr = this.expression()
      this.isMatch(TokenType.RIGHT_PAREN, 'expected )')
    }
    return expr
  }
  consume (type, errorMessage) {
    if (this.check(type)) {
      const token = this.tokens[this.current]
      this.current++
      return token
    } else {
      throw new Error(errorMessage)
    }
  }
  isMatch (types) {
    if (this.check(types)) {
      this.current++
      return true
    }
    return false
  }
  checkNext (types) {
    if (this.current + 1 > this.tokens.length) {
      return false
    }
    return this.check(types, this.current + 1)
  }
  check (types, index) {
    if (!this.isAtEnd()) {
      let tys = []
      if (Array.isArray(types)) {
        tys.push(...types)
      } else {
        tys.push(types)
      }
      for (let t of tys) {
        if (t === this.tokens[index !== undefined ? index : this.current].type) {
          return true
        }
      }
    }
    return false
  }
  previous () {
    return this.tokens[this.current - 1]
  }
  advance () {
    const t = this.tokens[this.current]
    this.current++
    return t
  }
  isAtEnd () {
    return this.current >= this.tokens.length
  }
}
export default Parser
