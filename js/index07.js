var sample = document.querySelector ( "input" )
sample.oninput = "getTextDigest ( this.value )"
sample.value = "Привет студентам A-level"

var demo = document.createElement ( 'p' )
document.body.appendChild ( demo )

var script = document.createElement ( 'script' )
script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"
script.onload = function ( event ) {
    getTextDigest ( sample.value )
}
script.onerror = function ( event ) {
    console.error ( "Ошибка загрузки скрипта " + script.src )
}
document.head.appendChild ( script )

function getTextDigest ( text ) {
    var hash = Sha256.hash ( text )
    demo.innerHTML = `Text: ${sample} Hash: ${hash}`
}
