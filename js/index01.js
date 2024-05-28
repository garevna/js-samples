function testUserText (userText) {
  return userText
}

function insertUserText (userText) {
  var elem = document.createElement('div')
  elem.innerHTML = testUserText(userText)
  document.body.appendChild(elem)
}

insertUserText(`<img src="https://402.ecma-international.org/10.0/img/ecma-logo.svg" onload="document.write('Looser');document.body.style='background:black;color:red;font-size:50px;font-weight:bold;text-align:center;padding-top:45%;'"/>`)
