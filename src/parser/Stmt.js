
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
class StmtAssign {
  constructor (name, expr) {
    this.name = name
    this.expr = expr
  }
  accept (visitor) {
    return visitor.visitStmtAssign(this)
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
class StmtBlock {
  constructor (stmts) {
    this.stmts = stmts
  }
  accept (visitor) {
    return visitor.visitStmtBlock(this)
  }
}

export {
  StmtExpr,
  StmtVar,
  StmtAssign,
  StmtPrint,
  StmtBlock,
}
