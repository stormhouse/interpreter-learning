const isDigit = (c) => /\d/.test(c)
const isWhiteSpace = (c) => /\s/.test(c)
const isOperator = (c) => /[+\-*\/(),=]/.test(c)
const isIdentifier = (c) => /[a-zA-Z_]/.test(c)
const isNonLatinCharacters = (s) => /[^\u0000-\u007F]/.test(s)

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
  let maxRecursive = 0

  while (index < codes.length) {
    if (maxRecursive > 1000) {
      throw new Error('Error: max recursive');
    }
    maxRecursive++
    char = codes[index]
    if (isWhiteSpace(char)) {
      next()
    } else if (isDigit(char)) {
      while (true) {
        const nextChar = next()
        if (isDigit(nextChar)) {
          char = char + nextChar
        } else {
          break
        }
      }
      addTokens('number', parseFloat(char))
    } else if (isNonLatinCharacters(char)) {
      while (true) {
        const nextChar = next()
        if (isNonLatinCharacters(nextChar)) {
          char = char + nextChar
        } else {
          break
        }
      }
      if (tokens.length === 0) {
        addTokens('text', char)
        addTokens('+') // 字符串连接
      } else {
        addTokens('+') // 字符串连接
        addTokens('text', char)
      }
    } else if (isOperator(char)) {
      addTokens(char)
      next()
    } else if (isIdentifier(char)) {
      let idf = char
      while (tokenNext() && isIdentifier(tokenNext())){
        idf += next()
      }
      addTokens('identifier', idf)
      next()
    } else {
      throw new Error('Error: unrecognized token: ' + char)
    }
  }
  
  addTokens('(end)')
  return tokens
}
export default lexer
// module.exports = lexer