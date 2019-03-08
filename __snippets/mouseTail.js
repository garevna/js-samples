function createMouseTail ( text ) {

     const parentElem = document.createElement ( 'div' )
     document.body.insertBefore ( parentElem, document.body.firstChild )
     // parentElem.className = "shadowDOM"
     var shadow = parentElem.attachShadow ( { mode: 'closed' } )
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
                        font-size: 11px;
                   }
                   .logo {
                         position: fixed;
                         bottom:5px;
                         right:5px;
                         color:#aaa;
                         font-size:12px;
                   }
                   .logo:after {
                         content: "© Филиппова Ірина 2018";
                   }
                `
                return style
        })()
     )
     var letters = text.split ( "" );
     var colors = [ 'red','yellow','blue','orange','green','#f0f','#f0f' ];
     var coords = { x:0, y:0 };
     var elems = [];
     function appendLetter () {
          if ( elems.length < letters.length ) {
               var elem = document.createElement( 'p' );
               elem.className = "mouseTailLetters";
               elem.innerHTML = letters [ elems.length ];
               elem.style.color = colors [ elems.length < colors.length ?
                           elems.length : elems.length - colors.length ];
               shadow.appendChild ( elem );
               elems.push ( elem );
          }
          return elems;
     }
     return function ( event ) {
          if ( Math.min ( Math.abs ( coords.x - event.clientX ), Math.abs ( coords.y - event.clientY ) ) < 10 ) return;
          coords = { x: event.clientX, y: event.clientY };
          elems = appendLetter ();
          for ( var i = elems.length - 1; i > 0; i-- ) {
               elems [ i ].style.top = elems [ i - 1 ].style.top;
               elems [ i ].style.left = elems [ i - 1 ].style.left;
          }
          elems [ 0 ].style.top = event.clientY + "px";
          elems [ 0 ].style.left = event.clientX + "px";
     }
}

document.body.onmousemove = createMouseTail ( "ПРИВЕТ!" )
