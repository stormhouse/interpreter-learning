import * as babel from 'babel-core'
const t = require('babel-types')

const code = `function square(x) {
  return x ** 2
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      BinaryExpression (path) {
        if (path.node.operator === '**') {
          path.replaceWith(
            // t.numberLiteral(2)
            t.binaryExpression('*', path.node.left, path.node.left)
            // t.binaryExpression("+", path.node.left, t.numberLiteral(2))
          )
        }
      },
    }
  }]
})
console.log(ast.code)

