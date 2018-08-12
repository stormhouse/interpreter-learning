export const symbolOriginal = {
  nud () {
    throw new Error('Error: unexpected token ==> "' + this.type + '"')
  },
  led (left) {
    throw new Error('Error: Missing operator')
  },
}