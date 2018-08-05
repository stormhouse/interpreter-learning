
/**
 * 
 * fact : number | '(' expression ')'
 * term : fact { (*|/) fact }
 * expression : term { (+|-) term }
 */
const parserByBNF = (tokens) => {
  const fact = () => {
    let t = tokens.shift()
    if (t.type === 'number') {
      return t
    }
    if (t.type === '(') {
      t = expression()
      if (tokens.shift().type !== ')') {
        throw new Error('Error: unexpected exp')
      }
      return t
    }
  }
  const term = () => {
    let node = fact()
    while (tokens[0].type === '*' || tokens[0].type === '/') {
      const o = tokens.shift()
      node = {
        type: o.type,
        left: node,
        right: term(),
      }
    }
    return node
  }
  const expression = () =>  {
    let tree
    const c = term()
    while (tokens[0].type === '+' || tokens[0].type === '-') {
      const o = tokens.shift()
      tree= {
        type: o.type,
        left: c,
        right: term(),
      }
    }
    return tree || c
  }
  return [expression()]
}