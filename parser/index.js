const parser = (tokens) => {
  const symbols = {}
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