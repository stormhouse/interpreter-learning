import lexer from './lexer/index.js'
import Lexer from './lexer/Lexer.js'
import Parser from './parser/Parser.js'
// import evaluator from './evaluator/index.js'
import Executor from './executor/Executor.js'
import Debugger from './debugger/index.js'
// const l = new Lexer(`// comment
// (123 + 234) + 3;`)
// l.lex()
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
  `var foo = 123 * 456 - 789 * 5 + 9 * 5;
print(123);
print(1+2);
234;
`,
// `// comment
// var foo = 123;
// var bar = 'str';
// var isF = true;
// if (isF) {
//   print(1);
// } else {
//   print(2);
// }
// (123 + 234) + 3;`
]
const vv = codes.map((code) => {
  const lexer = new Lexer(code)
  const tokens = lexer.lex()
  const d = new Debugger(tokens)
  d.draw()
  console.log((tokens))
  const parser = new Parser(tokens)
  const trees = parser.parse()
   console.log(trees)
  const executor = new Executor(trees)
  const result = executor.run()
  return result;
})

console.log(vv)
console.log(JSON.stringify(vv))
