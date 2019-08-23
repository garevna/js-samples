const text = `Что вам следует знать о JS`
Notification.requestPermission(
    permission => permission === "granted" ? 
        spawnNotification ( text ) : null
)
document.body.appendChild ( document.createElement ( "img" ) ).src = "./js-samples/icons/communication-1.png"
document.body.appendChild ( document.createElement ( "img" ) ).src = "../icons/communication-1.png"

document.body.appendChild ( document.createElement ( "img" ) ).src = "../images/js-ico.png"
document.body.appendChild ( document.createElement ( "img" ) ).src = "./js-samples/images/js-ico.png"
    
function spawnNotification( message ) {
    var options = {
        body: message,
        icon: "./js-samples/icons/communication-1.png",
        badge: "https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fmy-photo.png",
        image: "./js-samples/images/js-ico.png",
        requireInteraction: true
    }
    var n = new Notification( "garevna", options )
}
