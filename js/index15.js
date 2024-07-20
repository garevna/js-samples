document.body.onload = function (event) {
  var inp = document.querySelector('input')

  var scriptSHA = document.createElement('script')
  scriptSHA.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"

  scriptSHA.onload = event => inp.disabled = false
  scriptSHA.onerror = event => console.error('Error loading script ' + scriptSHA.src )

  document.head.appendChild(scriptSHA)

  var question = document.body.appendChild(document.createElement('p'))
  question.innerText = 'login: Ivan'
  inp.placeholder = 'password'
  inp.onchange = function (event) {
    var hash = Sha256.hash(this.value)
    var user = {
      id: '7849150',
      name: "Ivan",
      pass: hash
    }
    localStorage.setItem('user', JSON.stringify(user))
    var user = JSON.parse(localStorage.getItem('user'))
    console.log('USER: ', user)
  }
}
