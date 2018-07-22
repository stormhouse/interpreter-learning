const parser = (tokens) => {
  const symbols = {}
  let tokenIndex = 0
  const token = () => {
    const { type, value } = tokens[tokenIndex]
    const _token = Object.create(symbols[type])
    _token.type = type
    _token.value = value
    return _token
  }
  const advance = () => {
    tokenIndex++
    return token()
  }
  /**
   * @param {*} id
   * @param {*} nud null denotation     常用于值，如：变量、直接量、前缀操作符
   * @param {*} lbp left binding power
   * @param {*} led left denotation     中缀、后缀运算符
   */
  const symbol = (id, nud, lbp, led) => {
    const sym = symbols[id] || {}
    symbols[id] = {
      lbp: sym.lbp || lbp,
      nud: sym.nud || nud,
      led: sym.lef || led,
    }
  }
  const expression = (rbp) => {
    let _token = token()
    advance()
    if (rbp < token().lbp) {
      const t = token()
      advance()
      _token = {
        type: t.type,
        left: _token,
        right: expression(t.lbp)
      }
    }
    return _token
  }
  const infix = (id, lbp, led) => {
    symbol(id, null, lbp, function () {
      debugger
    })
  }
  const tree = []

  symbol(',')
	symbol(')')
	symbol('(end)')
  symbol('number', (number) => number)
  infix('+', 50)
  


  console.log(symbols)
  while (token().type !== '(end)') {
    tree.push(expression(0))
  }
  return tree
}
module.exports = parser