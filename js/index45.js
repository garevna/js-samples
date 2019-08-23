if ( Notification.permission !== "granted" )
    Notification.requestPermission( permission => console.log ( permission ) )
if ( Notification.permission !== "granted" ) return

function spawnNotification( theBody, theIcon, theTitle ) {
    var options = {
        body: theBody,
        icon: theIcon
    }
  var n = new Notification(theTitle, options)
}

spawnNotification(
    "Hello, students )",
    "https://www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/wink.png",
    "garevna"
) 
