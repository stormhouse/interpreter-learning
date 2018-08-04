const lexer = require('./lexer')
const parser = require('./parser')
const evaluator = require('./evaluator')
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
*/
// const code = `123`
const codes = [
  // `1`,
  `1 + 2`,
  `1 + 2 + 3`,
]
const vv = codes.map((code) => {
  const tokens = lexer(code)
  console.log(tokens)
  const trees = parser(tokens)
  console.log(trees)
  const values = evaluator(trees)
  return values;
})
console.log(vv)