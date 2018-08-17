class Scope {
  constructor (parent, symbols) {
    this.defs = {}
    this.symbols = symbols
    this.parent = parent || undefined
  }
  find (value) {
    if (this.defs[value]) {
      return this.defs[value]
    }
    return this.symbols[value];
  }
  define (t) {
    const _t = this.defs[t.value]
    if (_t) {
      throw new SyntaxError('SyntaxError: exits')
    }
    this.defs[t.value] = t
    t.nud = function () {
      return this
    }
    t.scope = this
  }
}
export default Scope