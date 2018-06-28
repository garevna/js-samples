var demo = document.querySelector ( "#demo" )
var btnReg = document.querySelector ( "#registration" )
var btnSignIn = document.querySelector ( "#sign-in" )
var nameElem = document.querySelector ( "#name" )
var passElem = document.querySelector ( "#pass" )
var title = document.querySelector ( "#title" )

var users = []
hideButtons ( false )

function hideButtons ( param ) {
    var dspl = param ? "none" : "inline-block"
    btnReg.style.display = dspl
    btnSignIn.style.display = dspl
    demo.style.display = !param ? "none" : "block"
}
function reg ( event ) {
    hideButtons ( true )
    demo.regim = 0
    title.innerHTML = "Регистрация"
}

function signIn ( event ) {
    hideButtons ( true )
    demo.regim = 1
    title.innerHTML = "Вход"
}

function testUserData () {
    if ( !nameElem.value || !passElem.value ) return
    var userKey = Sha256.hash ( nameElem.value + passElem.value )
    if ( demo.regim === 0 ) {
        if ( users.indexOf ( userKey ) < 0 ) {
            users.push ( userKey )
            title.innerHTML = `Регистрация ${nameElem.value} прошла успешно`
        } else title.innerHTML = `Пользователь ${nameElem.value} уже зарегистрирован`
    } 
    else {
        if ( users.indexOf ( userKey ) >= 0 ) {
            var script = document.createElement( 'script' )
            script.id = "hello"
            script.src = 'https://garevna.github.io/js-samples/js/testSHA384.js'
            script.crossOrigin = 'anonymous';
            script.integrity = 'sha384-yXrIdlO1CBJknfDtCtDe2tmWWNl5xK30aTz62nLkEpEIBRD3OGi7+To7hfKRaUZ/'
            document.head.appendChild( script )
            title.innerHTML = nameElem.value
        }
        setTimeout ( function () {
            document.querySelector ( "#hello" ).parentNode.removeChild ( script )
        }, 5000 )
    }
    hideButtons ( false )
}

