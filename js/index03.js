function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
      var x = document.createElement ( 'div' )
      x.innerHTML = testUserText ( userText )
      document.body.appendChild ( x )
}

document.querySelector ( 'input' ).onchange = function ( event ) {
        console.log ( event.target.value )
        insertUserText ( event.target.value )
}
// <IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>
// <BODY BACKGROUND="javascript:alert('XSS')">
