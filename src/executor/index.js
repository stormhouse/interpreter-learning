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
        let context = this.context
        let varExist = false
        let vv
        while (true) {
          if (context && context.variables && context.variables.hasOwnProperty(value)) {
            vv = context.variables[value]
            varExist = true
            break
          }
          if (context && context.parent) {
            context = context.parent
            continue
          } else {
            break
          }
        }
        if (varExist) {
          return vv
        } else {
          throw new Error('not found variable')
        }
        // if (this.context.variables.hasOwnProperty(value)) {
        //   return this.context.variables[value]
        // }
      }
    } else if (type === 'call') {
      const f = this.context.variables[value]
      this.createContext()
      // TODO 处理形参 实参数目不一致
      f.args.forEach((item, index) => {
        this.context.variables[item.value] = this.evaluateNode(node.args[index])
      })
      const vv = f.body.map((node) => this.evaluateNode(node))
      this.popContext()
      return vv[vv.length - 1]
    }
  }
  createContext () {
    const context = {
      parent: this.context,
      variables: {},
    }
    this.context = context
  }
  popContext () {
    this.context = this.context.parent
  }
}
export default Executor
