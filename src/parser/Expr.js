class ExprVariable {
  constructor (name) {
    this.name = name
  }
  accept (visitor) {
    return visitor.visitVariable(this)
  }
}
class ExprLiteral {
  constructor (value) {
    this.value = value
  }
  accept (visitor) {
    return visitor.visitLiteral(this)
  }
}
class ExprUnary {
  constructor (operator, operand) {
    this.operator = operator
    this.operand = operand
  }
  accept (visitor) {
    return visitor.visitUnary(this)
  }
}
class ExprBinary {
  constructor (operator, left, right) {
    this.operator = operator
    this.left = left
    this.right = right
  }
  accept (visitor) {
    return visitor.visitBinary(this)
  }
}
export {
  ExprVariable,
  ExprLiteral,
  ExprUnary,
  ExprBinary,
}
