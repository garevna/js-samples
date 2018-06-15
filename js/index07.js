var script = document.createElement ( 'script' )
script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"
document.head.appendChild ( script )

var sample = "Привет всем студентам A-level"
var hash = Sha256.hash ( sample )
console.log ( hash )
