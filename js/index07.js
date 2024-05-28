var sample = Object.assign(document.querySelector('input'), {
  oninput: getTextDigest,
  value: 'Hi, students!'
})

var demo = document.body.appendChild(document.createElement('p'))

var script = Object.assign(document.createElement('script'), {
  src: 'https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js',
  onload: getTextDigest,
  onerror (event) {
    console.error('Error loading script ' + script.src)
  }
})

document.head.appendChild(script)

function getTextDigest () {
  demo.innerHTML = `
    <p>Text: <em>${sample.value}</em></p>
    <p>Hash: ${Sha256.hash(sample.value)}</p>
  `
}
