const congrats = Object.assign(document.createElement('div'), {
  style: `
    position: fixed;
    width: 320px;
    height: 320px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 8px 8px 12px #00000090; 
    border: solid 0.5px #bbb; 
    padding: 32px;
    z-index: 300;
    background-color: #eef;
    font-family: Arial;
    font-size: 18px;
    color: #222;
    text-align: center;
  `,
  innerHTML: `
    <h3>Success!</h3>
    <p>file integrity test resuts with OK.</p>
    <p>This script has been loaded safely using <b>integrity</b> attribute/</p>
    <button onclick="congrats.remove()" style="padding: 4px 8px; margin: 36px 0;">
      OK
    </button>
  `,
  onclick (event) {
    event.target.remove()
  }
})

document.body.appendChild(congrats)
setTimeout(() => congrats.remove(), 8000)
