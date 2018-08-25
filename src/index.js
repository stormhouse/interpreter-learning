import lexer from './lexer/index.js'
import Parser from './parser/tdop.js'
import evaluator from './evaluator/index.js'
import Executor from './executor/index.js'
export const lpe = (code) => {
  const tokens = lexer(code)
  const parser = new Parser(tokens)
  const values = new Executor(parser).run()
  return values;
}
