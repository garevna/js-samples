let picture = new class SVG {
    constructor ( w, h ) {
        this.canvas = document.createElementNS ( "http://www.w3.org/2000/svg", "svg" )
        document.body.appendChild ( this.canvas )
        this.canvas.style.border = "dotted 1px gray"
        this.setSize ( w, h )
        this.attrs = {
            line: [ "x1", "y1", "x2", "y2" ],
            circle: [ "cx", "cy", "r" ],
            polygon: [ "points" ],
            rect: [ "x", "y", "width", "height" ],
            text: [ "x", "y", "fill", "style" ]
        }
    }
    setSize ( w, h ) {
        this.canvas.setAttribute ( "width", w )
        this.canvas.setAttribute ( "height", h )
    }
    drawFigure ( figure, params ) {
        var elem = document.createElementNS ( "http://www.w3.org/2000/svg", figure )
        this.canvas.appendChild ( elem )
        for ( var x of this.attrs [ figure ] ) {
            elem.setAttribute ( x, params [ x ] )
        }
        return elem
    }
} ( window.innerWidth - 30, window.innerHeight - 300 )


var hello = picture.drawFigure ( "text", {
    x: '250',
    y: '200',
    fill: "yellow",
    style: `
        font-family: monospace;
        font-size: 30;
        font-weight: bold;
        transform: rotate(45deg);`
} )
hello.innerHTML = "Hello"

var polygon = picture.drawFigure ( "polygon", { points: "100,100 200,200 300,100 100,100" } )
polygon.setAttribute ( "stroke", "#8f5" )
polygon.setAttribute ( "fill", "#ff00ff90" )


var circle = picture.drawFigure ( "circle", { cx: 250, cy: 250, r: 150 } )
circle.setAttribute ( "stroke", "yellow" )
circle.setAttribute ( "fill", "transparent" )
circle.setAttribute ( "stroke-width", 8 )

var rect = picture.drawFigure ( "rect", { x: 180, y: 180, width: 150, height: 100 } )
rect.setAttribute ( "stroke", "green" )
rect.setAttribute ( "fill", "#ffff0090" )
rect.setAttribute ( "stroke-width", 5 )

var students = picture.drawFigure ( "text", {
    x: '150',
    y: '300',
    fill: "blue",
    style: "font-size: 30; font-weight: bold"
} )
students.innerHTML = "Students"
