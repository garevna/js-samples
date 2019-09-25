console.log ( Symbol.for ( "section" ) )
console.log ( window [ Symbol.for ( "section" ) ] )

function Figure ( params ) {
     this.type = params ? params.type || 'circle' : 'square'
     this.elem = this.canvas.appendChild (
            document.createElementNS ( "http://www.w3.org/2000/svg",
                        this.type )
     )

     for ( var attr in this.default [ this.type ] ) {
          var val = params ?
              params [ attr ] || this.default [ this.type ] [attr ] :
                                 this.default [ this.type ] [attr ]
          this.elem.setAttributeNS ( null, attr, val )
     }
     for ( var attr in this.attrs ) {
          var val = params ? params [ attr ] ||
                             this.attrs [ attr ] :
                             this.attrs [ attr ]
          this.elem.setAttributeNS ( null, attr, val )
     }
}
Figure.prototype.canvas = document.body.appendChild (
        document.createElementNS ( "http://www.w3.org/2000/svg", 'svg' )
)
Figure.prototype.canvas.setAttributeNS( null, 'width', window.innerWidth - 40 )
Figure.prototype.canvas.setAttributeNS( null, 'height', window.innerHeight - 400 )
Figure.prototype.canvas.style.border = 'solid 1px red'

Figure.prototype.default = {
     circle: { cx:100, cy:100, r:100 },
     ellipse: { cx:100, cy:100, rx:150, ry:80 },
     rect: { x:80, y:80, width:150, height:100 },
     line: { x1:50, y1:20, x2:200, y2:200 },
     polyline: { points: '20,20 100,100 50,100 300,400' },
     polygon: { points: '300,100 400,290 160,210' }
}
Figure.prototype.attrs = {
     fill: 'white',
     stroke: '#000',
     'stroke-width': 2
}

var circle = new Figure ( {
     type: 'circle',
     cx: 150,
     cy: 200,
     r: 100,
     stroke: 'red',
     'stroke-width': 10,
     fill: 'transparent'
} )

var rect = new Figure ( {
     type: 'rect',
     x: 50,
     y: 300,
     width: 200,
     height: 100,
     stroke: 'blue',
     'stroke-width': 5,
     fill: 'yellow'
} )

var line = new Figure ( {
     type: 'line',
     x1: 50,
     y1: 50,
     x2: 400,
     y2: 300,
     stroke: 'green',
     'stroke-width': 5
} )

var polygon = new Figure ( {
     type: 'polygon'
} )

var polyline = new Figure ( {
     type: 'polyline',
     fill: 'transparent',
     stroke: '#f0f',
     'stroke-width': 7
} )
