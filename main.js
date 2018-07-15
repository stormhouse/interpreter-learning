const lexer = require('./lexer')
const parser = require('./parser')

const tokens = lexer('123')
const tree = parser(tokens)
console.log(tokens)
console.log(tree)