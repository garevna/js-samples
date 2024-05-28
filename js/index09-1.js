var demo = document.getElementById('demo')
var btnReg = document.getElementById('registration')
var btnSignIn = document.getElementById('sign-in')
var nameElem = document.getElementById('name')
var passElem = document.getElementById('pass')
var title = document.getElementById('title')

var users = []
hideButtons(false)

function hideButtons (param) {
  btnReg.style.display = param ? 'none' : 'inline-block'
  btnSignIn.style.display = param ? 'none' : 'inline-block'
  demo.style.display = !param ? 'none' : 'block'
}
function reg (event) {
  hideButtons(true)
  demo.regim = 0
  title.innerHTML = 'Sign Up'
}

function signIn (event) {
  hideButtons(true)
  demo.regim = 1
  title.innerHTML = 'Sign In'
}

function testUserData () {
  if (!nameElem.value || !passElem.value) return
  var userKey = Sha256.hash(nameElem.value + passElem.value)
  if (demo.regim === 0) {
    if (users.indexOf(userKey) < 0) {
      users.push(userKey)
      title.innerHTML = `User registration of ${nameElem.value} has been successful.`
    } else title.innerHTML = `User ${nameElem.value} had been already registered.`
  } else {
    if (users.indexOf(userKey) >= 0) {
      var script = Object.assign(document.createElement('script'), {
        id: 'hello',
        src: 'https://garevna.github.io/js-samples/js/testSHA384.js',
        crossOrigin: 'anonymous',
        integrity: 'sha384-yXrIdlO1CBJknfDtCtDe2tmWWNl5xK30aTz62nLkEpEIBRD3OGi7+To7hfKRaUZ/'
      })
      document.head.appendChild(script)
      title.innerHTML = nameElem.value
    }
    setTimeout(function () {
      document.querySelector('#hello').parentNode.removeChild(script)
    }, 8000)
  }
  hideButtons(false)
}
