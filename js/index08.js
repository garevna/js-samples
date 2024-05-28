const link = document.body
  .appendChild(document.createElement('a'))
Object.assign(link, {
  href: 'https://www.srihash.org/',
  target: '_blank',
  innerHTML: '<b>SRI Hash Generator</b>',
  style: 'display: block; margin: 32px; padding: 8px 16px; font-family: Arial; font-size: 18px; color: #09b'
})


const resource = 'https://garevna.github.io/js-samples/js/testSHA.js'
const integrity = 'sha256-dW1XlNjmC8tXO4CXA3J29xlEVkXmqd79LXSZ0wPQOCY='

const script = Object.assign(document.createElement('script'), {
  src: 'https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js',
  onload: event => Object.assign(shaButton, { disabled: false }),
  onerror: event => console.error('Error loading script ' + script.src)
})

document.head.appendChild(script)

const options = {
  integrity,
  crossorigin: 'anonymous'
}

const hash = document.body
  .appendChild(document.createElement('p'))

const [shaButton, loadButton] = [0, 1].map(() => document.createElement('button'))

Object.assign(shaButton, {
  innerText: 'SHA256 hash for file content',
  disabled: true,
  onclick: event => {
    fetch(resource, options)
      .then(response => response.text())
      .then(response => {
        hash.textContent = 'SHA-256 hash: ' + Sha256.hash(response)
        document.body.appendChild(loadButton)
        shaButton.remove()
      })
      .catch(err => Object.assign(hash, { innerHTML: 'File Inegrity Error ' + resource }))
    }
  })
document.body.appendChild(shaButton)

Object.assign(loadButton, {
  innerHTML: 'Load script file with integrity',
  onclick: event => {
    var userScript = Object.assign(document.createElement('script'), {
      src: resource,
      integrity,
      onerror: () => console.log('Integrity test has failed')
    })
    document.head.appendChild(userScript)
    loadButton.remove()
  }
})
