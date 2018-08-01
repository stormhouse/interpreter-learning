const isDigit = function (c) {
  return /\d/.test(c)
}
const isOperator = function (c) {
  return /[+\-*\/()]/.test(c)
}

const lexer = (codes) => {
  const tokens = []
  let char = ''
  let index = 0
  const next = () => {
    return codes[++index]
  }
  const addTokens = (type, t) => {
    tokens.push({type: type, value: t})
  }

  while (index < codes.length) {
    char = codes[index]
    if (isDigit(char)) {
      while (true) {
        const nextChar = next()
        if (isDigit(nextChar)) {
          char = char + nextChar
        } else {
          break
        }
      }
      addTokens('number', char)
      continue
    } else if (isOperator(char)) {
      addTokens(char)
    }
    next()
  }
  
  addTokens('(end)')
  return tokens
}
module.exports = lexer

// console.log(lexer('1'))
// console.log(lexer('12'))
// console.log(lexer('123'))
// console.log(lexer('  123'))
// console.log(lexer('  123 456'))
// console.log(lexer('1 + 2'))