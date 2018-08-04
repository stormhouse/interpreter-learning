const parser = function (tokens) {
  const tree = []
  const symbols = {}
  let tokenIndex = 0
  const token = function () {
    const { type, value } = tokens[tokenIndex]
    const _token = Object.create(symbols[type])
    _token.type = type
    _token.value = value
    return _token
  }
  const tokenNext = function () {
    const { type, value } = tokens[tokenIndex+1]
    const _token = Object.create(symbols[type])
    _token.type = type
    _token.value = value
    return _token
  }
  const advance = function () {
    tokenIndex++
    return token()
  }
  /**
   * @param {*} id
   * @param {*} nud null denotation     常用于值，如：变量、直接量、前缀操作符
   * @param {*} lbp left binding power
   * @param {*} led left denotation     中缀、后缀运算符
   */
  const symbol = function (id, nud, lbp, led) {
    const sym = symbols[id] || {}
    symbols[id] = {
      lbp: sym.lbp || lbp,
      nud: sym.nud || nud,
      led: sym.lef || led,
    }
  }
  const infix = function (id, lbp, led) {
    symbol(id, null, lbp, function (left) {
      return {
        type: id,
        left: left,
        right: expression(this.lbp)
      }
    })
  }
  const prefix = function (id, rbp) {
    symbol(id, function ({type, value}) {
      return {
        type: type,
        right: expression(rbp),
      }
    })
    // function (left) {

    //   debugger
    //   return {
    //     type: id,
    //     // left: left,
    //     // right: expression(this.lbp)
    //   }
    // })
  }
  const expression = function (rbp) {
    let _token = token()
    advance()
    let left = _token.nud(_token)
    while (rbp < token().lbp) {
      const t = token()
      advance()
      //       led<left>)))))))))))))))))
      left = t.led(left)
    }
    return left
  }

  symbol(',')
  symbol(')')
  symbol('(end)')
  symbol('number', (number) => {
    return number
  })
  symbol('(', () => {
    const value = expression(1)
    if (token().type !== ')' && token().type !== ',') {
      throw new Error('syntax error: no ")" to match')
    }
    advance()
    return value
  })
  symbol('identifier', ({type, value}) => {
    if (token().type === '(') {
      const args = []
      if (tokenNext().type === ')') {
      } else {
        while (true) {
          args.push(expression(0))
          if (token().type === ')') {
            break
          }
        }
      }
      return {
        type: 'call',
        value: value,
        args: args,
      }
    }
  })
  // symbol('number')
  infix('+', 50)
  infix('*', 60)
  prefix('-', 50)


  console.log(symbols)
  // while (token().type !== '(end)') {
    tree.push(expression(0))
  // }
  return tree
}
module.exports = parser