import * as babel from 'babel-core'
const t = require('babel-types')

const code = `function square(x) {
  return x * x
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      BinaryExpression(path) {
        path.parentPath.replaceWith(
          t.expressionStatement(t.stringLiteral("Anyway the wind blows, doesn't really matter to me, to me."))
        );
      }
    }
  }]
})
console.log(ast.code)

