var addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))

var container = addElem('div')
container.className = 'flex-container'
var avatar = addElem('img', container)
var userLogin = addElem('h4', container)
var startButton = addElem('button', container)

var timeOut = time => new Promise(resolve => setTimeout(resolve, time))

function show (photoURL, login) {
  avatar.src = photoURL
  avatar.style.display = 'block'
  avatar.style.opacity = 1
  userLogin.innerText = `winner: ${login}`
  userLogin.style.display = 'block'
}

function getWinner () {
  var winnwer = Math.round(Math.random() * 20000)
  fetch(`https://api.github.com/users?since=${winnwer}`)
    .then(response => response.json())
    .then(users => show(users[0].avatar_url, users[0].login))
}

startButton.innerText = 'Spin the roulette'

startButton.onclick = event => {
  event.target.style.display = 'none'

  avatar.height = '200'
  avatar.src = 'https://i.pinimg.com/originals/32/37/bf/3237bf1e172a6089e0c437ffd3b28010.gif'
  avatar.style.transition = 'all 0.5s'
  timeOut(2500)
    .then(() => {
      avatar.style.opacity = 0
      getWinner()
    })

  timeOut(10000)
    .then(() => {
      avatar.style.display = 'none'
      userLogin.style.display = 'none'
      event.target.style.display = 'block'
    })
}
