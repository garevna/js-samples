const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
mod.textContent = `
  import {showMessage} from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
