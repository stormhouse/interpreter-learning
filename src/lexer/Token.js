class Token {
  constructor (type, literal, row, column, index) {
    this.type = type
    this.literal = literal
    this.row = row
    this.column = column
    this.index = index
  }
}
export default Token
