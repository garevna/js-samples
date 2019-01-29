class CustomSVG {
    constructor ( w, h ) {

    }

    setSize ( w, h ) {
        if ( !w || !h ) return
        this.canvas.setAttribute ( "width", w )
        this.canvas.setAttribute ( "height", h )
    }
    setControls () {
        document.body.insertAdjacentHTML ( "beforeEnd", this.template )
        this.init()

        for ( let x of [ "figure", "stroke", "stroke-width", "fill", "angle" ] ) {
            document.getElementsByName ( x )[0]
                .onchange = function ( event ) {
                    this [ x ] = event.target.value
                    this.data = []
                }.bind ( this )
        }
        document.getElementsByName ( "delete" ) [0]
            .onclick = function ( event ) {
                this.delete = !this.delete
                this.data = []
                this.startFigure = false
                this.currentPolygon = null
                event.target.innerText = this.delete ?
                    "Выключить режим удаления элементов" :
                    "Включить режим удаления элементов"
                for ( let item of this.canvas.children ) {
                    item.onclick = this.delete ?
                        function ( event ) {
                            event.target.remove()
                        } : null
                }
            }.bind ( this )
    }

    drawFigure ( figure, params ) {

        var elem = document.createElementNS ( "http://www.w3.org/2000/svg", figure )
        for ( let x of [ "stroke", "stroke-width", "fill" ] ) {
            elem.setAttribute ( x, this [ x ] )
        }
        this.canvas.appendChild ( elem )

        for ( var attr of this.canvas.attrs [ figure ] ) {
            elem.setAttribute ( attr, params [ attr ] )
        }
        elem.onclick = function ( event ) {
            this.delete ? event.target.remove() : null
        }
        return elem
    }

    getData () {
        let area = this.canvas.getBoundingClientRect()
        return this.data.map (
          item => {
            return {
              x: item.x - area.left,
              y: item.y - area.top
            }
          }
        )
    }

    line () {
      let data = this.getData ()
      data.length < 2 ? null :
          this.drawFigure (
              "line",
              {
                  x1: data[0].x,
                  y1: data[0].y,
                  x2: data[1].x,
                  y2: data[1].y
              }
          )
    }

    circle () {
      let data = this.getData ()
      data.length < 2 ? null :
          this.drawFigure (
              "circle",
              {
                  cx: data[0].x,
                  cy: data[0].y,
                  r: Math.sqrt (
                      ( data[1].x - data[0].x )**2 +
                      ( data[1].y - data[0].y )**2
                  )
              }
          )
    }

    rect () {
      let data = this.getData ()
      data.length < 2 ? null :
          this.drawFigure (
              "rect",
              {
                  x: Math.min ( data[0].x, data[1].x ),
                  y: Math.min ( data[0].y, data[1].y ),
                  width: Math.abs ( data[1].x - data[0].x ),
                  height: Math.abs ( data[1].y - data[0].y )
              }
          )
    }

    polygon () {
        function getPoints ( data ) {
            let points = ""
            return data.reduce (
                ( points, item ) => `${points} ${item.x},${item.y} `,
            "" )
        }
        let data = this.getData ()
        this.currentPolygon ?
            this.currentPolygon
                .setAttribute ( "points", getPoints ( data ) ) :
            this.currentPolygon = this.drawFigure (
                "polygon",
                { points: getPoints ( data ) }
            )
        this.currentPolygon.oncontextmenu = function ( event ) {
            event.preventDefault()
            const reset = document.body.appendChild (
                document.createElement ( "button" )
            )
            reset.style = `
                position: fixed;
                top: ${event.clientY}px;
                left: ${event.clientX}px;
                z-index: 500;
            `
            reset.innerText = "Finis polygon"
            reset.onclick = function ( event ) {
                this.data = []
                this.startFigure = false
                this.currentPolygon.oncontextmenu = null
                this.currentPolygon = null
                event.target.remove()
            }.bind ( this )
        }.bind ( this )
    }

    text () {
      let message = document.getElementsByName( "message" )[0].value
      if ( !message ) return
      let data = this.getData ()
      let text = picture.drawFigure (
          "text",
          {
              x: data[0].x,
              y: data[0].y
          }
      )
      text.innerHTML = message
      text.style.transform = `rotate(${this.angle}deg)`
    }

    init () {
      for ( let x of [ "figure", "stroke", "stroke-width", "fill", "angle" ] ) {
          this [ x ] = document.getElementsByName ( x )[0].value
      }
    }
}

CustomSVG.prototype.template = `
<style>
    body { background-color: #000; color: #eee; }
    * { font-family: monospace, Arial; }
    section { margin: 10px 20px; }
    div { display: inline-block; }
    svg {
      width: 95%;
      height: 400px;
      border: dotted 1px gray;
    }
    text {
        font-size: 30px;
        font-family: Arial;
        font-weight: bold;
        transform-origin: 50% 50%;
    }
    button, input:not([type="color"]), select {
        padding: 5px 10px;
        margin: 5px 10px;
    }
    input[type="color"], input[type="number"] { width:50px; }
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
       <label for="fill">Цвет заливки</label>
       <input type="color" name="fill" value="#ff00ff"/>
    </div>
    <div>
       <label for="stroke">Цвет линии</label>
       <input type="color" name="stroke" value="#ffffff"/>
       <label for="stroke-width" value=3>Толщина линии</label>
       <input type="number" name="stroke-width"/>
    </div>

    <div>
       <label for="angle">Угол поворота текста</label>
       <input type="number" name="angle" value="0"/>
    </div>
    <button name="delete">Включить режим удаления элементов</button>
    <hr/>
    <p style="color:#aaf">Click right mouse button to stop drawing polygon</p>
</section>
`

CustomSVG.prototype.data = []

CustomSVG.prototype.startFigure = false
CustomSVG.prototype.endFigure = false
CustomSVG.prototype.currentPolygon = null

CustomSVG.prototype.canvas = (
    function ( w, h ) {
        let canvas = document
            .createElementNS ( "http://www.w3.org/2000/svg", "svg" )
        document.body.appendChild ( canvas )
        canvas.attrs = {
            line: [ "x1", "y1", "x2", "y2" ],
            circle: [ "cx", "cy", "r" ],
            polygon: [ "points" ],
            rect: [ "x", "y", "width", "height" ],
            text: [ "x", "y", "fill", "style" ]
        }

        canvas.onclick = function ( event ) {

            if ( !this.figure || this.delete ) return

            const testEndPoint = () =>
                    Math.abs ( this.data[0].x - event.clientX ) < 3 &&
                    Math.abs ( this.data[0].y - event.clientY ) < 3

            const setPoligon = () => {
                this.endFigure = this.data.length > 2 && testEndPoint ()
                this.startFigure = !this.endFigure
                this [ this.figure ]()
            }

            const setOther = () => {
                this.startFigure = !this.startFigure
                this.startFigure ? null : this [ this.figure ]()
            }

            this.data = !this.startFigure ? [] : this.data
            this.data.push ( { x: event.clientX, y: event.clientY } )

            this.figure === "polygon" ? setPoligon () :
                this.figure === "text" ? this [ this.figure ]() : setOther ()
        }.bind ( this )

        return canvas
    }
).call ( CustomSVG.prototype )

CustomSVG.prototype.controls = (
    () => CustomSVG.prototype.setControls ()
)()

let picture = new CustomSVG ( window.innerWidth - 50, window.innerHeight - 100 )
