( function () {
     var x = location.hash.substr(1)
     import ( `./index${location.hash.slice(1)}.js` )
     document.addEventListener(
       "DOMContentLoaded",
       event => import ( `../__snippets/mouseTail.js` )
     )
})()
