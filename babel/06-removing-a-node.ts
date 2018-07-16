import * as babel from 'babel-core'
const t = require('babel-types')

const code = `class Foo {
  constructor () {
    const a = 1
    function foo () {}
  }
  bar () {
    const a = 1
  }
}`

const ast = babel.transform(code, {
  plugins: [{
    visitor: {
      FunctionDeclaration(path) {
        path.remove();
      }
    }
  }]
})
console.log(ast.code)

