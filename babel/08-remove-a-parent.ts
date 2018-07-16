import * as babel from 'babel-core'
const t = require('babel-types')

const code = `function square(x) {
  return x * x
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      BinaryExpression(path) {
        path.parentPath.remove()
      }
    }
  }]
})
console.log(ast.code)

