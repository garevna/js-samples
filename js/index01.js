function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
     document.body.innerHTML += testUserText ( userText )
}

insertUserText ( '><img src="javascript:alert();"' )
