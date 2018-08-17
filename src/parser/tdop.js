import { symbolOriginal } from "./symbolOriginal.js";
import Token from "./Token.js";
import Scope from "./Scope.js";

class Parser {
  constructor (tokens) {
    this.tokenIndex = 0
    this.initSymbols()
    this.tokens = tokens.map((t) => new Token(t.type, t.value))
    this.scope = new Scope(null, this.symbols)
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
    const statment = (id, std) => {
      const s = symbol(id)
      s.std = std
      s.nud = function () {
        return this
      }
      return s
    }
    statment('var', function () {
      _this.advance()
      const idf = _this.token()
      const assign = _this.tokenNext()
      if (idf.type === 'identifier' && assign.type === '=' ) {
        _this.advance()
        _this.advance()
        _this.scope.define(idf)
        return {
          type: 'assignment',
          left: idf,
          right: _this.expression(0),
        }
      }
    })
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
  token (index) {
    const _t = this.tokens[index || this.tokenIndex]
    /**
     * type        value
     * -------------------
     * identifier  var
     * identifier  foo
     * number      123
     * operator    +-/*
     * operator    =
     */
    let o
    if (_t.type === 'identifier') {
      o = this.scope.find(_t.value)
    } else {
      o = this.symbols[_t.type] // TODO type (number) value
    }
    const t = Object.create(o || symbolOriginal)
    t.type = _t.type
    t.value = _t.value
    return t
  }
  tokenNext () {
    return this.token(this.tokenIndex + 1)
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
  statment () {
    let i = 0;
    let result
    // while (true) {
    //   i++
    //   if (i> 100000) break
      const t = this.token()
      if (t.type === 'identifier' && t.std) {
        result = t.std()
      } else {
        result = this.expression(0)
      }
    // }
    return result
  }
  statments () {
    const trees = []
    while (this.tokens[this.tokenIndex].type !== '(end)') {
      trees.push(this.statment())
    }
    return trees
  }
  toAST () {
    return this.statments()
  }
}

export default Parser