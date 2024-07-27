var tagNames = ['div', 'div', 'div', 'div', 'button']
var divStyle = `
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: solid 1px green;
  font-size: 25px;
`
elements = tagNames.map(tag => document.body.appendChild(document.createElement(tag)))

elements
  .filter(element => element.tagName === 'DIV')
  .forEach((element, num) => {
    element.style = divStyle
    element.innerText = num
  })
elements
  .filter(element => element.tagName === 'BUTTON')
  .forEach(element => {
    element.innerHTML = 'remove DIVs'
    element.onclick = function (event) {
      recursRemove()
    }
  })

var recursRemove = (function (selector) {
  var elems = document.querySelectorAll(selector)
  var num = 0
  return function rem () {
    if (num === elems.length) return
    elems[num].parentNode.removeChild(elems[num++])
    rem()
  }
})('DIV')
