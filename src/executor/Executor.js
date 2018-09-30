import TokenType from '../lexer/TokenType.js'
class Executor {
  constructor (stmts) {
    this.stmts = stmts
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
      value,
    } = stmt

    debugger
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
