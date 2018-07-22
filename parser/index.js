const parser = (tokens) => {
  const symbols = {}
  /**
   *
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
  const tree = []

  symbol(',')
	symbol(')')
	symbol('(end)')
	symbol('number', (number) => number)
  

  console.log(symbols)
  return tree
}
module.exports = parser