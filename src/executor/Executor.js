import TokenType from '../lexer/TokenType.js'
import Context from './Context.js'

class Executor {
  constructor (stmts) {
    this.stmts = stmts
    this.context = new Context()
  }
  run () {
    const result = []
    for (let stmt of this.stmts) {
      result.push(this.execute(stmt))
    }
    return result
  }
  execute (stmt) {
    return stmt.accept(this)
  }
  expression (expr) {
    return expr.accept(this)
  }
  visitStmtVar (stmt) {
    const {
      name,
      expr,
    } = stmt
    this.context.define(name.literal, this.expression(expr))
  }
  visitStmtAssign (stmt) {
    const {
      name,
      expr,
    } = stmt
    this.context.define(name.literal, this.expression(expr))
  }
  visitStmtPrint (stmt) {
    const expr = stmt.expr
    const value = this.expression(expr)
    console.log(value)
  }
  visitStmtExpr (stmt) {
    const expr = stmt.expr
    const value = this.expression(expr)
    return value
  }
  visitStmtBlock (stmt) {
    const stmts = stmt.stmts
    // enter block scope
    this.context = new Context(this.context)
    for (let s of stmts) {
      this.execute(s)
    }
    // exit block scope
    this.context = this.context.parent
  }
  visitStmtFunction (stmt) {
    this.context.define(stmt.name.literal, stmt)
  }
  visitStmtCall (stmt) {
    const f = this.context.getVariable(stmt.callee.literal)
    const realArgs = stmt.parameter
    const st = f.stmts
    for (let s of st.stmts) {
      this.execute(s)
    }
  }
  visitVariable (expr) {
    const n = expr.name.literal
    return this.context.getVariable(n)
  }
  visitLiteral (expr) {
    return expr.value
  }
  visitUnary (expr) {
    debugger

  }
  visitBinary (expr) {
    const {
      operator,
      left,
      right,
    } = expr
    switch (operator.type) {
      case TokenType.PLUS:
        return this.execute(left) + this.execute(right)
      case TokenType.MINUS:
        return this.execute(left) - this.execute(right)
      case TokenType.STAR:
        return this.execute(left) * this.execute(right)
      case TokenType.SLASH:
        return this.execute(left) / this.execute(right)
    }
  }
}
export default Executor
