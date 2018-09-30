
class StmtExpr {
  constructor (expr) {
    this.expr = expr
  }
  accept (visitor) {
    return visitor.visitStmtExpr(this)
  }
}
class StmtVar {
  constructor (name, expr) {
    this.name = name
    this.expr = expr
  }
  accept (visitor) {
    return visitor.visitStmtVar(this)
  }
}
class StmtPrint {
  constructor (expr) {
    this.expr = expr
  }
  accept (visitor) {
    return visitor.visitStmtPrint(this)
  }
}

export {
  StmtExpr,
  StmtVar,
  StmtPrint,
}
