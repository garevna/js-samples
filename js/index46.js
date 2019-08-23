const text = `Что вам следует знать о JS`
Notification.requestPermission(
    permission => permission === "granted" ? 
        spawnNotification ( text ) : null
)
document.body.appendChild ( document.createElement ( "img" ) ).src = "/js-samples/icons/communication-1.png"
document.body.appendChild ( document.createElement ( "img" ) ).src = "/js-samples/images/js-ico.png"
    
function spawnNotification( message ) {
    var options = {
        body: message,
        icon: "/js-samples/icons/communication-1.png",
        badge: "https://politikus.ru/uploads/posts/2012-09/1347832924_trollface.png",
        image: "/js-samples/images/js-ico.png",
        requireInteraction: true
    }
    var n = new Notification( "garevna", options )
}
