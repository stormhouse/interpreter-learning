import { NUMBER } from "../types.js";

const operators = {
  '+': function (a, b) {
    return a + b
  },
  '-': function (a, b) {
    return a - b
  },
  '*': function (a, b) {
    return a * b
  },
  '/': function (a, b) {
    return a / b
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
      const r = this.execute()
      if (r !== 'stmt') {
        results.push(r)
      }
    }
    return results
  }
  execute () {
    const r = this.evaluateNode(this.trees[this.treeIndex])
    this.treeIndex = this.treeIndex + 1
    return r
  }
  evaluateNode (node) {
    if (node === undefined) {
      return undefined // var foo
    }
    const {
      type,
      value,
      left,
      right,
    } = node
    if (type === NUMBER) {
      return node.value
    } else if (type === 'assignment') {
      const variables = this.context.variables || {}
      variables[left.value] = this.evaluateNode(right)
      this.context.variables = variables
      return 'stmt'
    } else if (operators[type]) {
      if (left) {
        return operators[type](this.evaluateNode(left), this.evaluateNode(right))
      } else {
        return operators[type](0, this.evaluateNode(right))
      }
    } else if (type === 'identifier') {
      if (value === 'function') {
        return node
      } else {
        //if (this.context.variables[value]) { // var foo
        if (this.context.variables.hasOwnProperty(value)) {
          return this.context.variables[value]
        }
      }
    } else if (type === 'call') {
      const f = this.context.variables[value]
      this.createContext()
      const vv = f.body.map((node) => this.evaluateNode(node))
      this.popContext()
      return vv[vv.length - 1]
    }
  }
  createContext () {
    const context = {
      parent: this.context,
    }
    this.context = context
  }
  popContext () {
    this.context = this.context.parent
  }
}
export default Executor
