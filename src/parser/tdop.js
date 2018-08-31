import { symbolOriginal } from "./symbolOriginal.js";
import Token from "./Token.js";
import Scope from "./Scope.js";
import { NUMBER } from "../types.js"

class Parser {
  constructor (tokens) {
    this.tokenIndex = 0
    this.initSymbols()
    this.tokens = tokens.map((t) => new Token(t.type, t.value))
    this.scope = new Scope(null, this.symbols)
  }
  createScope () {
    this.scope = new Scope(this.scope, this.symbols)
  }
  popScope () {
    this.scope = this.scope.parent
  }
  initSymbols () {
    const _this = this
    this.symbols = {}
    const symbol = (id, lbp) => {
      let s = this.symbols[id]
      if (!s) {
        s = Object.create(symbolOriginal)
        s.lbp = lbp
      } else {
        s.lbp = lbp || s.lbp
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
      let idf
      let assignOrComma
      const vv = []
      let max = 0
      while (true) {
        max++
        if (max > 10000) break
        // idf = _this.token()
        idf = _this.tokenOriginal()
        if (idf.type === '\n') {
          _this.advance()
          break
        }
        if (idf.type === ',') {
          _this.advance()
          continue
        }
        assignOrComma = _this.tokenNext()
        if (assignOrComma.type === '\n') {
          _this.scope.define(idf)
          vv.push({
            type: 'assignment',
            left: idf,
            //right: _this.expression(0),
          })
          _this.advance()
          _this.advance()
          break
        }else if (assignOrComma.type === ',') {
          _this.scope.define(idf)
          _this.advance()
          vv.push({
            type: 'assignment',
            left: idf,
            //right: _this.expression(0),
          })
          _this.jumpToken(',')
        } else if (assignOrComma.type === '=') {
          _this.advance()
          _this.advance()
          _this.scope.define(idf)
          vv.push({
            type: 'assignment',
            left: idf,
            right: _this.expression(0),
          })
        }
      }
      return vv
    })
    const infix = (id, lbp, led) => {
      const s = symbol(id, lbp)
      //s.nud = nud
      s.led = led || function (left) {
        return {
          type: this.type,
          left: left,
          right: _this.expression(this.lbp),
        }
      }
    }
    symbol(NUMBER).nud = function (t) { return t }
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
    infix('(', 80, function (t) {
      const a = {
        type: 'call',
        value: t.value,
      }
      _this.advance()
      return a
    })

    const prefix = function (id, nud, lbp) {
      const s = symbol(id, lbp)
      s.nud = nud || function (t) {
        return {
          type: t.type,
          right: _this.expression(lbp),
        }
      }
    }
    prefix('-')
    prefix('+')
    prefix('function', function (t) {
      _this.createScope()
      const args = []
      _this.expectAndAdvance('(')
      while (true) {
        // const token = _this.token()
        const token = _this.tokenOriginal()
        if (token.type === ')') break
        args.push(token)
        _this.advance()
        if (_this.token().type === ')') break
        _this.expectAndAdvance(',')
      }
      _this.advance()
      _this.expectAndAdvance('{')
      _this.jumpToken('\n')
      t.args = args
      t.body = _this.statments()
      _this.popScope();
      _this.expectAndAdvance('}')
      return t
    })
  }
  tokenOriginal () {
    return this.tokens[this.tokenIndex]
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
      let scope = this.scope
      while (true) {
        o = scope.find(_t.value)
        if (o) break
        if (scope.parent) {
          scope = scope.parent
          continue
        } else {
          break
        }
      }
      if (!o) throw new Error('not define', + _t.value)
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
  isToken(id) {
    if (typeof id === 'string') {
      return this.token().type === id
    } else if (isArray(id)) {
      return id.indexOf(this.token().type) > -1
    }
  }
  jumpToken(id) {
    if (this.isToken(id)) {
      this.tokenIndex++
    }
  }
  expectToken(id) {
    if (!this.isToken(id)) {
      throw new SyntaxError('SyntasxError: expect "' + id + '"')
    }
  }
  expectAndAdvance (id) {
    this.expectToken(id)
    this.advance()
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
    /*
    if (this.isToken('\n')) { // 单行1时，没有\n
      this.advance()
    }*/
    return left
  }
  statment () {
    let i = 0;
    let result
    const t = this.token()
    //if (t.type === 'identifier' && t.std) {
    if (t.std) {
      this.advance()
      result = t.std()
    } else {
      result = this.expression(0)
      if (this.token().type !== '(end)') {
        this.advance()
      }
    }
    return result
  }
  statments () {
    let trees = []
    while (this.token().type !== '(end)' && this.token().type !== '}') {
      trees = trees.concat(this.statment())
    }
    this.trees = trees
    return trees
  }
  toAST () {
    return this.trees ? this.trees : this.statments()
  }
}

export default Parser
