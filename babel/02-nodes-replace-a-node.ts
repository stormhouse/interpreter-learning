import * as babel from 'babel-core'
const t = require('babel-types')

const code = `function square(x) {
  return x ** 2
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      ReturnStatement (path) {
        if (true) {
          path.replaceWithMultiple([

            // t.numberLiteral(2)
            // t.binaryExpression('*', path.node.left, path.node.left),
            this,
            t.expressionStatement(t.stringLiteral("Is this the real life?")),
            t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
            t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
            // t.binaryExpression("+", path.node.left, t.numberLiteral(2))
          ])
        }
      },
    }
  }]
})
console.log(ast.code)

