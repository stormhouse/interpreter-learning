export const symbolOriginal = {
  nud () {
    throw new SyntaxError('SyntaxError: unexpected token ==> "' + this.type + '"')
  },
  led (left) {
    throw new Error('Error: Missing operator')
  },
}