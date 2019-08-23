const text = `Что вам следует знать о JS`
Notification.requestPermission(
    permission => permission === "granted" ? 
        spawnNotification ( text ) : null
)
    
function spawnNotification( message ) {
    var options = {
        body: message,
        icon: "../icons/communication-1.png",
        badge: "https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fmy-photo.png",
        image: "https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fsmoke-monkey.gif",
        requireInteraction: true
    }
    var n = new Notification( "garevna", options )
}
