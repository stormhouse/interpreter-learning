const evaluator = (trees) => {
  const operators = {
    '+': (a, b) => {
      return a + b
    },
    '-': (a, b) => {
      return a - b
    },
    '*': (a, b) => {
      return a * b
    }
  }
  const functions = {
    now () {
      return new Date()
    }
  }

  const evaluateNode = (node) => {
    if (node.type === 'number') {
      return node.value
    } else if (operators[node.type]) {
      if (node.left) {
        return operators[node.type](evaluateNode(node.left), evaluateNode(node.right))
      } else {
        return operators[node.type](0, evaluateNode(node.right))
      }
    } else if (node.type === 'call') {
      const fn = functions[node.value]
      return fn.apply(null, node.args)
    }
  }

  const values = []
  for (let i=0, len=trees.length; i<len; i++) {
    const value = evaluateNode(trees[0])
    values.push(value)
  }
  return values
}

module.exports = evaluator