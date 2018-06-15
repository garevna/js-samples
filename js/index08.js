var script = document.createElement ( 'script' )
script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"

script.onload = event => shaButton.disabled = false
script.onerror = event => 
            console.error ( "Ошибка загрузки скрипта " + script.src )

document.head.appendChild ( script )

var hash = document.createElement ( 'p' )
document.body.appendChild ( hash )
hash.innerHTML = "You should input file name"

var shaButton = document.createElement ( 'button' )
document.body.appendChild ( shaButton )
shaButton.innerHTML = "SHA256 hash for file content"
shaButton.disabled = true
shaButton.onclick = event => {
    var fileName = document.querySelector ( 'input' ).value || 'js/testSHA.js'
    document.querySelector ( 'input' ).value = fileName
    fetch ( fileName )
        .then ( responseObject => {
                responseObject.text().then ( response => {
                        hash.innerHTML = Sha256.hash ( response )
                        loadButton.disabled = false
                })
        })
}

var loadButton = document.createElement ( 'button' )
document.body.appendChild ( loadButton )
loadButton.innerHTML = "load script file with integrity"
loadButton.disabled = true
loadButton.onclick = event => {
    var userScript = document.createElement ( 'script' )
    userScript.src = "js/testSHA.js"
    userScript.integrity = "sha256-" + hash.innerHTML
    userScript.onerror = () => console.log ( "Integrity test has failed" )
    document.head.appendChild ( userScript )
}


