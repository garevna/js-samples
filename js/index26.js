const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
mod.textContent = `
  import {showMessage} from './js/testESModules.js'
  const promise = function (message) {
    return new Promise(function (resolve, reject) {
      setInterval(() => resolve(message), 10000)
    })
  }

  async function showMessages () {
    const messages = [
      'Hello, students!',
      'Welcome to new age of ES Modules!',
      'How are you feel about this?'
    ]
    for (const item of messages) await promise(item).then(showMessage)
  }

  showMessages()
`
