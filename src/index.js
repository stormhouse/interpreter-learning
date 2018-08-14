import lexer from './lexer/index.js'
import Parser from './parser/tdop.js'
import evaluator from './evaluator/index.js'
export const lpe = (code) => {
  const tokens = lexer(code)
  const trees = new Parser(tokens).toAST()
  const values = evaluator(trees)
  return values;
}