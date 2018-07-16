import * as babel from 'babel-core'
const t = require('babel-types')

const code = `class Foo {
  constructor () {
    const a = 1
  }
  bar () {
    const a = 1
  }
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      ClassMethod(path) {
        console.log(path.node.kind)
        path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before')));
        path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')));
      }
    }
  }]
})
console.log(ast.code)

