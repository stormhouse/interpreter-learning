import TokenType from '../lexer/TokenType.js'
import {
  ExprLiteral,
  ExprUnary,
  ExprBinary,
} from './Expr.js'

/*
expression     --> addition
addition       --> multiplication ("+" | "-") multiplication | multiplication
multiplication --> unary ("*" | "/") unary | unary
unary          --> "-" unary | primary
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
      this.ss.push(this.expression())
    }
    return this.ss
  }
  expression () {
    const expr = this.addtion()
    return expr
  }
  addtion () {
    let expr = this.multiplication()
    // loop vs recursive
    while (this.match([TokenType.PLUS, TokenType.MINUS])) {
      expr = new ExprBinary(this.previous(), expr, this.multiplication())
    }
    // if (this.match([TokenType.PLUS, TokenType.MINUS])) {
    //   return new ExprBinary(this.previous(), expr, this.addtion())
    // }
    return expr
  }
  multiplication () {
    let expr = this.unary()
    // loop or recursive
    while (this.match([TokenType.STAR, TokenType.SLASH])) {
      expr = new ExprBinary(this.previous(), expr, this.unary())
    }
    // if (this.match([TokenType.STAR, TokenType.SLASH])) {
    //   return new ExprBinary(this.previous(), expr, this.multiplication())
    // }
    return expr
  }
  unary () {
    if (this.match(TokenType.MINUS)) {
      return new ExprUnary(this.previous(), this.unary())
    }
    const expr = this.primary()
    return expr
  }
  primary () {
    let expr
    if (this.match(TokenType.TURE)) {
      return new ExprLiteral('true')
    }
    if (this.match(TokenType.NUMBER)) {
      return new ExprLiteral(this.previous().literal)
    }
    if (this.match(TokenType.LEFT_PAREN)) {
      expr = this.expression()
      this.match(TokenType.RIGHT_PAREN, 'expect )')
    }
    return expr
  }
  match (types) {
    if (this.check(types)) {
      this.current++
      return true
    }
    return false
  }
  check (types) {
    if (!this.isAtEnd()) {
      let tys = []
      if (Array.isArray(types)) {
        tys.push(...types)
      } else {
        tys.push(types)
      }
      for (let t of tys) {
        if (t === this.tokens[this.current].type) {
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
    this.current++
  }
  isAtEnd () {
    return this.current >= this.tokens.length
  }
}
export default Parser
