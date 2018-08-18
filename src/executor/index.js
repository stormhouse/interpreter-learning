const operators = {
  '+': function (a, b) {
    return a + b
  }
}
class Executor {
  constructor (parser) {
    this.treeIndex = 0
    this.trees = parser.toAST()
    this.scope = parser.scope
    this.context = {}
  }
  run () {
    const results = []
    while (this.treeIndex < this.trees.length) {
      results.push(this.execute())
    }
    return results
  }
  execute () {
    const r = this.evaluateNode(this.trees[this.treeIndex])
    this.treeIndex = this.treeIndex + 1
    return r
  }
  evaluateNode (node) {
    const {
      type,
      value,
      left,
      right,
    } = node
    if (type === 'number') {
      return node.value
    } else if (type === 'assignment') {
      const variables = this.context.variables || {}
      variables[left.value] = this.evaluateNode(right)
      this.context.variables = variables
      return 'statments'
    } else if (operators[type]) {
      return operators[type](this.evaluateNode(left), this.evaluateNode(right))
    } else if (type === 'identifier') {
      if (this.context.variables[value]) {
        return this.context.variables[value]
      }
    }
  }
}
export default Executor