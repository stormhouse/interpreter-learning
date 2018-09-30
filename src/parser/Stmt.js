
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
class StmtFunction {
  constructor (name, parameter, stmt) {
    this.name = name
    this.parameter = parameter
    this.stmts = stmt
  }
  accept (visitor) {
    return visitor.visitStmtFunction(this)
  }
}
class StmtCall {
  constructor (callee, parameter) {
    this.callee = callee
    this.parameter = parameter
  }
  accept (visitor) {
    return visitor.visitStmtCall(this)
  }
}

export {
  StmtExpr,
  StmtVar,
  StmtAssign,
  StmtPrint,
  StmtBlock,
  StmtFunction,
  StmtCall,
}
