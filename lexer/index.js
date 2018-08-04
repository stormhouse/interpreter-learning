const isDigit = function (c) {
  return /\d/.test(c)
}
const isOperator = function (c) {
  return /[+\-*\/(),]/.test(c)
}
const isIdentifier = function (c) {
  return /[a-zA-Z_]/.test(c)
}

const lexer = (codes) => {
  const tokens = []
  let char = ''
  let index = 0
  const next = () => {
    return codes[++index]
  }
  const token = () => {
    return codes[index]
  }
  const tokenNext = () => {
    return codes[index + 1]
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
      addTokens('number', parseFloat(char))
      continue
    } else if (isOperator(char)) {
      addTokens(char)
    } else if (isIdentifier(char)) {
      let idf = char
      while (isIdentifier(tokenNext())){
        idf += next()
      }
      addTokens('identifier', idf)
    }
    next()
  }
  
  addTokens('(end)')
  return tokens
}
module.exports = lexer