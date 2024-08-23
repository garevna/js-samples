(function () {
  import(`./index${location.hash.slice(1)}.js`)
  document.addEventListener('DOMContentLoaded', event => import(`../snippets/mouseTail.js`))
})()
