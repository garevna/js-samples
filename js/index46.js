const text = `Что вам следует знать о JS`
Notification.requestPermission(
    permission => permission === "granted" ? 
        spawnNotification ( text ) : null
)
// document.body.appendChild ( document.createElement ( "img" ) ).src = "/js-samples/icons/communication-1.png"
// document.body.appendChild ( document.createElement ( "img" ) ).src = "/js-samples/images/js-ico.png"
    
function spawnNotification( message ) {
    var options = {
        badge: "https://developers.google.com/web/fundamentals/push-notifications/images/notification-screenshots/mobile/chrome-badge.png",
//         icon: "/js-samples/icons/link.png",
        body: text
//         image: "https://politikus.ru/uploads/posts/2012-09/1347832924_trollface.png"
    }
    var note = new Notification( "garevna", options )
    console.log ( 'badge', note.badge )
    console.log ( 'image', note.image )
    console.log ( 'icon', note.icon )
    console.log ( 'body', note.body )
}
