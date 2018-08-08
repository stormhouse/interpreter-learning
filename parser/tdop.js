import { symbolOriginal } from "./SymbolOriginal.js";
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
    symbol(',')
    symbol(')')
    symbol('+', 50).led = function (left) {
      return {
        type: this.type,
        left: left,
        right: _this.expression(this.lbp),
      }
    }
    console.log(this.symbols)
  }
  token () {
    const _t = this.tokens[this.tokenIndex]
    const o = this.symbols[_t.type]
    const t = Object.create(o || {})
    t.type = _t.type
    t.value = _t.value
    return t
  }
  advance () {
    this.tokenIndex++
  }
  expression (lbp) {
    const token = this.token()
    let left = token
    this.advance()
    let i = 0
    while (lbp < this.token().lbp) {
      const tt = this.token()
      this.advance()
      left = tt.led(token)
      debugger
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