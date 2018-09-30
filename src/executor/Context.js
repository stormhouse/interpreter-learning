class Context {
  constructor (context) {
    this.parent = context
    this.variables = {}
  }
  define (name, value) {
    this.variables[name] = value
  }
  getVariable (name) {
    return this.variables[name]
  }
}

export default Context
