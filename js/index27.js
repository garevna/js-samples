var addElem = ( tagName, container ) =>
    ( container ? container : document.body )
        .appendChild (
            document.createElement ( tagName )
        )

var timeOut = time => new Promise (
    resolve => setTimeout ( () => resolve(), time )
)

var container = addElem ( "div" )
container.className = "flex-container"
var startButton = addElem ( 'button', container )
startButton.innerText = 'Крутить рулетку'

startButton.onclick = event => {
    var winnwer = Math.round ( Math.random() * 20000 )
    var user
    event.target.style.display = "none"
    function show( photoURL, login ) {
        img.src = photoURL
        user = addElem ( "h4", container )
        user.innerText = `winner: ${login}`
    }
    var img = addElem( "img", container )
    img.height = "200"
    img.src = "https://thumbs.gfycat.com/LivelyObviousAnhinga-size_restricted.gif"
    img.style.transition = "all 0.5s"
    timeOut ( 2500 )
        .then ( () => img.src = "https://thumbs.gfycat.com/OddWideHookersealion-small.gif" )
    timeOut ( 1800 )
        .then ( () => img.style.opacity = 0 )
    timeOut ( 2500 )
        .then ( () => img.style.opacity = 1 )
    timeOut ( 2500 )
        .then (
            () => fetch ( `https://api.github.com/users?since=${winnwer}` )
                      .then ( response => response.json()
                          .then ( users => show ( users[0].avatar_url, users[0].login ) )
                      )
        )
    timeOut ( 10000 )
        .then ( () => {
            img.remove()
            user.remove()
            event.target.style.display = "block"
        })
}
