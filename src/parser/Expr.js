class ExprLiteral {
  constructor (value) {
    this.value = value
  }
}
class ExprUnary {
  constructor (operator, operand) {
    this.operator = operator
    this.operand = operand
  }
}
class ExprBinary {
  constructor (operator, left, right) {
    this.operator = operator
    this.left = left
    this.right = right
  }
}
export {
  ExprLiteral,
  ExprUnary,
  ExprBinary,
}
