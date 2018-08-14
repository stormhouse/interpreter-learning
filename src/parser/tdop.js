import { symbolOriginal } from "./symbolOriginal.js";
import Token from "./Token.js";

class Parser {
  constructor (tokens) {
    this.tokenIndex = 0
    this.initSymbols()
    this.tokens = tokens.map((t) => new Token(t.type, t.value))
  }
  initSymbols () {
    const _this = this
    this.symbols = {}
    const symbol = (id, lbp) => {
      let s = this.symbols[id]
      if (!s) {
        s = Object.create(symbolOriginal)
        s.lbp = lbp
      }
      this.symbols[id] = s
      return s
    }
    const infix = (id, lbp, nud) => {
      const s = symbol(id, lbp)
      s.nud = nud
      s.led = function (left) {
        return {
          type: this.type,
          left: left,
          right: _this.expression(this.lbp),
        }
      }
    }
    symbol('number').nud = function (t) { return t }
    symbol(',')
    symbol(')')
    symbol('(').nud = function (left) {
      const t = _this.expression(0)
      if (_this.token().type !== ')') {
        throw new SyntaxError('SyntaxError: require ")"')
      }
      _this.advance()
      return t
    }
    infix('+', 50)
    infix('-', 50)
    infix('*', 60)
    infix('/', 60)

    const prefix = function (id, lbp, nud) {
      const s = symbol(id, lbp)
      s.nud = function (t) {
        return {
          type: t.type,
          right: _this.expression(lbp),
        }
      }
    }
    prefix('-')
    prefix('+')
  }
  token () {
    const _t = this.tokens[this.tokenIndex]
    const o = this.symbols[_t.type]
    const t = Object.create(o || symbolOriginal)
    t.type = _t.type
    t.value = _t.value
    return t
  }
  advance () {
    this.tokenIndex++
  }
  expression (lbp) {
    const token = this.token()
    this.advance()
    let left = token.nud(token)
    let i = 0
    while (lbp < this.token().lbp) {
      const tt = this.token()
      this.advance()
      left = tt.led(left)
      i++
      if (i> 10000) break
    }
    return left
  }
  toAST () {
    const trees = []
    // while (this.tokens[this.tokenIndex] !== '(end)') {
      trees.push(this.expression(0))
    // }
    return trees
  }
}

export default Parser