'use strict'

export function showMessage(message) {
  const section = document.querySelector('[script="dynamic-import-3.js"]').shadow.querySelector('section')
  const demo = document.createElement('div')
  demo.style = `
    position: absolute;
    top: 5%; left: 5%;
    bottom: 5%; right: 5%;
    box-shadow: 8px 8px 12px #00000090;
    border: solid 0.5px #bbb;
    padding: 32px;
    z-index: 300;
    background-color: #000;
  `
  section.appendChild(demo)
  demo.innerHTML = `
    <h2 style="color: #789">Module was successfully imported</h2>
    <p style="color: #fa0">Now you can see how it works :)</p>
    <hr>
    <p style="color: #dde">${message}</p>
  `
}
