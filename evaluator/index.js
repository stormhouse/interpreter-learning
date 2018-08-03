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

  const evaluateNode = (node) => {
    if (node.type === 'number') {
      return node.value
    } else if (operators[node.type]) {
      if (node.left) {
        return operators[node.type](evaluateNode(node.left), evaluateNode(node.right))
      } else {
        return operators[node.type](0, evaluateNode(node.right))
      }
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