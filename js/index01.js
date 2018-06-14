function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
      var x = document.createElement ( 'div' )
      x.innerHTML = testUserText ( userText )
      document.body.appendChild ( x )
}

insertUserText ( '<script src="javascript:alert(this);"></script>' )
