import * as babel from 'babel-core'
const t = require('babel-types')

const code = `function square(x) {
  return x ** 2
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      FunctionDeclaration (path) {
        path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
        path.insertAfter(t.expressionStatement(t.stringLiteral("A little high, little low.")));
      },
    }
  }]
})
console.log(ast.code)

