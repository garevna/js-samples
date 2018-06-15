var script = document.createElement ( 'script' )
script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"
script.onload = function ( event ) {
    var sample = "Привет всем студентам A-level"
    var hash = Sha256.hash ( sample )
    console.log ( hash )
}
script.onerror = function ( event ) {
    console.error ( "Ошибка загрузки скрипта " + script.src )
}
document.head.appendChild ( script )
