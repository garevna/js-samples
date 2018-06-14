function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
      var x = document.createElement ( 'div' )
      x.innerHTML = testUserText ( userText )
      document.body.appendChild ( x )
}

insertUserText ( '<img dynsrc=javascript:(()=>void document.write("LOOSER!!!");)()/>' )
