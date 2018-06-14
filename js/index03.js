function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
      var x = document.createElement ( 'div' )
      x.innerHTML = testUserText ( userText )
      document.body.appendChild ( x )
}

document.querySelector ( 'input' ).onchange = function ( event ) {
        insertUserText ( event.target.value )
}
// <IMG SRC=/ onerror="document.write(String.fromCharCode(88,83,83))"></img>
// <IFRAME SRC=js/attack.js onmouseover="alert(document.cookie)"></IFRAME>
