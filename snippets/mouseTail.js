function createMouseTail ( text ) {
    const letters = text.split ( "" )
    let currentMousePosition = { x:0, y:0 }
    const elems = []

    const parentElem = document.createElement ( 'div' )
    document.body.insertBefore ( parentElem, document.body.firstChild )
    
    const shadow = parentElem.attachShadow ( { mode: 'closed' } )
    shadow.appendChild ( document.createElement ( 'div' ) ).className = "logo"
    shadow.appendChild (
        ( () => {
                var style = document.createElement ( 'style' )
                style.textContent = `
                   .mouseTailLetters {
                        position: fixed;
                        font-family: Arial;
                        transition: all 0.2s;
                        z-index: 1000;
                        font-size: 0.8rem;
                   }
                   .logo {
                         position: fixed;
                         bottom:5px;
                         right:5px;
                         color:#aaa;
                         font-size: 0.8rem;
                   }
                   .logo:after {
                         content: "© Филиппова Ірина 2018";
                   }
                `
                return style
        })()
    )
    
    function appendLetter () {
         const colors = [ '#f00','#ff0','#0ff','#f50','#0f0','#f0f','#fa0','#09b' ]
         var elem = document.createElement( 'p' )
         elem.className = "mouseTailLetters"
         elem.innerHTML = letters [ elems.length ]
         elem.style.color = colors [ elems.length < colors.length ?
                           elems.length : elems.length - colors.length ]
         shadow.appendChild ( elem )
         elems.push ( elem )
    }
    const test = event => Math.min (
        Math.abs ( currentMousePosition.x - event.clientX ),
        Math.abs ( currentMousePosition.y - event.clientY ) 
    )
    function redraw () {
        for ( var i = elems.length - 1; i > 0; i-- ) {
            elems [i].style.top = elems [i-1].style.top
            elems [i].style.left = elems [i-1].style.left
        }
        elems [0].style.top = arguments[1] + "px"
        elems [0].style.left = arguments[0] + "px"
    }
    return function ( event ) {
        if ( test ( event ) < 10 ) return
        currentMousePosition = { x: event.clientX, y: event.clientY }
        elems.length < letters.length ? appendLetter () : null
        requestAnimationFrame( redraw.bind ( null, event.clientX, event.clientY ) )
    }
}

document.body.onmousemove = createMouseTail ( "ПРИВЕТ!" )
