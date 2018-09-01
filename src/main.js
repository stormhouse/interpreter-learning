import lexer from './lexer/index.js'
import Parser from './parser/tdop.js'
// import evaluator from './evaluator/index.js'
import Executor from './executor/index.js'
/*
代码: 字符串
  123
  1 + 2
  1 + 2 * 3
词法分析：token数组
  [{ type: 'number', value: '123' }, { type: '(end)' }]
  [{ type: 'number', value: '1' }, { type: '+' }, { type: 'number', value: '2' }, { type: '(end)' }]
  ...
语法分析：语法树
  [{ type: 'number', value: 123 }]
  [{ type: '+',
    left: { type: 'number', value: '1' },
    right: { type: 'number', value: '2'},
  }]
  ...
  `var foo = 1 + 2
  var bar = foo + 3
  var baz = function (a, b) {1}
  foo
  baz()
  bar`,
*/
// const code = `123`
const codes = [
  `var aa = 111
  var bb = 222
  var baz = function (a, b) {
    a + b
  }
  baz(aa, bb)`
]
const vv = codes.map((code) => {
  const tokens = lexer(code)
  console.log((tokens))
  const parser = new Parser(tokens)
  const trees = parser.toAST()
  console.log(trees, parser.scope)
  const executor = new Executor(parser)
  const result = executor.run()
  return result;
})

console.log(vv)
console.log(JSON.stringify(vv))
