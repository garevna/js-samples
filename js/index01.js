function testUserText ( userText ) {
      return userText
}
function insertUserText ( userText ) {
     document.body.innerHTML += testUserText ( userText )
}

insertUserText ( '<script>document.body.innerHTML = "КАПЕЦ СТРАНИЧКЕ!"</script>' )
