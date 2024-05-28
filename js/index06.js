class CustomSVG {
  constructor (w, h) {
    //
  }

  setSize (w, h) {
    if (!w || !h) return
    this.canvas.setAttribute('width', w)
    this.canvas.setAttribute('height', h)
  }

  setControls () {
    document.body.insertAdjacentHTML('beforeEnd', this.template)
    this.init()

    for (const name of ['figure', 'stroke', 'stroke-width', 'fill', 'angle']) {
      document.getElementsByName(name)[0]
        .onchange = function (event) {
          this [name] = event.target.value
          this.data = []
        }.bind(this)
      }
      document.getElementsByName('delete')[0]
        .onclick = function (event) {
          this.delete = !this.delete
          this.clear()
          event.target.innerText = (this.delete ? 'Disable' : 'Enable') + ' removal mode'
          for (const item of this.canvas.children ) {
            item.onclick = this.delete ? event => event.target.remove() : null
          }
        }.bind(this)
    }

    drawFigure (figure, params) {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
      for (const attr of ['stroke', 'stroke-width', 'fill']) {
        elem.setAttribute(attr, this[attr])
      }
      this.canvas.appendChild(elem)

      for (const attr of this.canvas.attrs[figure]) {
        elem.setAttribute(attr, params[attr])
      }
    
      elem.onclick = function (event) {
        this.delete && event.target.remove()
      }
    
      return elem
    }

    getData () {
      const area = this.canvas.getBoundingClientRect()
      return this.data.map(item => ({ x: item.x - area.left,  y: item.y - area.top }))
    }

    line () {
      const [{ x: x1 = 0, y: y1 = 0 }, { x: x2, y: y2 }] = this.getData()
    
      x2 && y2 && this.drawFigure('line', { x1, y1, x2, y2 })
    }

    circle () {
      const [{ x: cx, y: cy }, { x: dx, y: dy }] = this.getData()
      const r = dx && dy ? Math.sqrt((dx - cx) ** 2 + (dy - cy) ** 2) : 0
    
      r && this.drawFigure('circle', { cx, cy, r })
    }

    rect () {
      const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = this.getData ()
    
      x2 && y2 && this.drawFigure('rect', {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2)
      })
    }

    polygon () {
      const points = this.getPoints(this.getData())

      this.currentPolygon
        ? this.currentPolygon.setAttribute('points', points)
        : Object.assign(this, {
            currentPolygon: this.drawFigure('polygon', { points })
          })

      this.currentPolygon.oncontextmenu = function (event) {
        event.preventDefault()
        const reset = document.body.appendChild(document.createElement('button'))
        Object.assign(reset, {
          innerText: 'Finish polygon',
          style: `
            position: fixed;
            top: ${event.clientY}px;
            left: ${event.clientX}px;
            z-index: 500;
          `,
          onclick: function (event) {
            this.clear()
            event.target.remove()
          }.bind(this)
        })
      }.bind(this)
    }

    text () {
      const message = document.getElementsByName('message')[0].value
      if (!message) return
      const [{ x, y }] = this.getData()
      const text = (this.drawFigure('text', { x, y }))
      text.innerHTML = message
      text.style.transform = `rotate(${this.angle}deg)`
    }

    init () {
      for (const attr of ['figure', 'stroke', 'stroke-width', 'fill', 'angle']) {
        this[attr] = document.getElementsByName(attr)[0].value
      }
    }
}

const template = `
  <style>
    body { background-color: #000; color: #eee; }
    * { font-family: monospace, Arial; }
    section { margin: 12px 24px; }
    div { display: inline-block; }
    svg {
      width: calc(100% - 24px);
      height: calc(100% - 180px);
      border: dotted 1px gray;
    }
    text {
      font-size: 32px;
      font-family: Arial;
      font-weight: bold;
      transform-origin: 50% 50%;
    }
    button, input:not([type="color"]), select {
      padding: 8px 12px;
      margin: 8px 12px;
    }
    input[type="color"], input[type="number"] { width:64px; }
  </style>
  <section>
    <div>
      <input name="message" placeholder="Input text here..."/>
      <label for="figure">figure</label>
      <select name="figure">
        <option value=null>...</option>
        <option value="circle">circle</option>
        <option value="line">line</option>
        <option value="rect">rect</option>
        <option value="polygon">polygon</option>
        <option value="text">text</option>
      </select>
    </div>
    <div>
       <label for="fill">Fill color</label>
       <input type="color" name="fill" value="#ff00ff"/>
    </div>
    <div>
       <label for="stroke">Stroke color</label>
       <input type="color" name="stroke" value="#ffffff"/>
       <label for="stroke-width" value=3>Stroke width</label>
       <input type="number" name="stroke-width"/>
    </div>

    <div>
       <label for="angle">Text rotation angle</label>
       <input type="number" name="angle" value="0"/>
    </div>
    <button name="delete">Enable item removal mode</button>
    <hr/>
    <p style="color:#aaf">Click right mouse button to stop drawing polygon</p>
</section>
`

Object.assign(CustomSVG.prototype, {
  data: [],
  startFigure: false,
  endFigure: false,
  currentPolygon: null,
  clear () {
    Object.assign(this, {
      data: [],
      startFigure: false,
      endFigure: false,
      currentPolygon: null
    })
  },

  testEndPoint () {
    const [{ x, y }] = this.data
    return Math.abs(x - event.clientX) < 3 && Math.abs(y - event.clientY) < 3
  },

  getPoints (data) {
    return data.reduce((points, item) => `${points} ${item.x},${item.y} `, '')
  },

  testFigure () {
    return ['circle', 'line', 'rect', 'polygon', 'text'].includes(this.figure)
  },

  setPoligon () {
    this.endFigure = this.data.length > 2 && this.testEndPoint()
    this.startFigure = !this.endFigure
    this[this.figure]()
  },

  setOther () {
    this.startFigure = !this.startFigure
    !this.startFigure && this[this.figure]()
  },

  template
})

CustomSVG.prototype.canvas = (function (w, h) {
  const canvas = document.body
    .appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
  canvas.attrs = {
    line: ['x1', 'y1', 'x2', 'y2'],
    circle: ['cx', 'cy', 'r'],
    polygon: ['points'],
    rect: ['x', 'y', 'width', 'height'],
    text: ['x', 'y', 'fill', 'style']
  }

  canvas.onclick = function (event) {
    if (!this.testFigure() || this.delete) return

    this.data = !this.startFigure ? [] : this.data
    this.data.push({ x: event.clientX, y: event.clientY })

    this.figure === 'polygon'
      ? this.setPoligon()
      : this.figure === 'text'
        ? this[this.figure]()
        : this.setOther()
  }.bind(this)

  return canvas
}).call(CustomSVG.prototype)

CustomSVG.prototype.controls = CustomSVG.prototype.setControls()

new CustomSVG()
