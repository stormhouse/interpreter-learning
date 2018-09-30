import ColorMap from './ColorMap.js'
import TokenType from '../lexer/TokenType.js'

class Debugger {
  constructor (tokens) {
    this.tokens = tokens
    this.initCanvas()
  }
  initCanvas () {
    const canvas = document.createElement('canvas')
    var context = canvas.getContext("2d")
    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio = context.webkitBackingStorePixelRatio || 1
    const ratio = devicePixelRatio / backingStoreRatio

    var w = 400 // $("#code").width();
    var h = 200 // $("#code").height();

  //要将 canvas 的宽高设置成容器宽高的 2 倍
  // var canvas = document.createElement("canvas");
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.style.background = '#242424'
    //然后将画布缩放，将图像放大两倍画到画布上
    context.scale(ratio,ratio);

    document.body.appendChild(canvas)
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    return canvas
  }
  draw () {
    const offsetY = 10
    let baseX = 0
    let x = 10, y = 10, context = this.context
    this.tokens.forEach((token) => {
      const newY = offsetY + (token.row - 1) * 16
      if (y != newY) {
        x = 10
      }
      y = newY
      if (token.type == TokenType.RIGHT_PAREN) {
        baseX -= 10
      }
      const t = new Text(context, (token.literal) + ' ', ColorMap[token.type], x + baseX, y)
      if (token.type == TokenType.LEFT_PAREN) {
        baseX += 10
      }
      x = t.draw().x
    })
  }
}
class Text {
  constructor (context, text, color, x, y) {
    this.context = context
    this.text = text
    this.color = color
    this.x = x
    this.y = y
  }
  draw () {
    this.context.fillStyle = this.color || '#ff79c6'
    this.context.textBaseline = 'top'
    this.context.font = '14px Arial'
    this.context.fillText(this.text, this.x, this.y)
    const { width , height } = this.context.measureText(this.text)
    return {
      x: this.x + width
    }
  }
}
export default Debugger
