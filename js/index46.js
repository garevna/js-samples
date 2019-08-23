const text = `Что вам следует знать о JS`
Notification.requestPermission(
    permission => permission === "granted" ? 
        spawnNotification ( text ) : null
)
document.body.appendChild ( document.createElement ( "img" ) ).src = "/js-samples/icons/communication-1.png"
document.body.appendChild ( document.createElement ( "img" ) ).src = "/js-samples/images/js-ico.png"
    
function spawnNotification( message ) {
    var options = {
        image: "/js-samples/images/js-ico.png"
    }
    var n = new Notification( "garevna", options )
}
