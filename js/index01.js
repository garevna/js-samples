function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
      var x = document.createElement ( 'div' )
      x.innerHTML = testUserText ( userText )
      document.body.appendChild ( x )
}

insertUserText ( '[img]http://www.qwewqw.ru/1.jpg dynsrc=javascript:alert()[/img]' )
