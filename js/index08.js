var script = document.createElement ( 'script' )
script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"
script.onload = function ( event ) {
    var hash = ""
    fetch ( 'js/testSHA.js' )
        .then ( responseObject => {
                responseObject.text().then ( response => {
                        console.log ( 'TEXT: ', response )
                        hash = Sha256.hash ( response )
                        console.log ( 'HASH: ', hash )
                })
        })
    //var userScript = document.createElement ( 'script' )
    //userScript.src = "js/testSHA.js"
    //userScript.integrity = "sha256-7bb9fbc3a068bc2751364d8269f7b64cbcbaeb463ed5dec238c71abeead6bda2"
    //userScript.id = "sha256Test"
    //userScript.onerror = () => console.log ( "Integrity test has failed" )
    //document.head.appendChild ( userScript )
}
script.onerror = function ( event ) {
    console.error ( "Ошибка загрузки скрипта " + script.src )
}
document.head.appendChild ( script )
