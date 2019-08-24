Notification.requestPermission(
    permission => permission === "granted" ? 
        showNotification ( `Что вам следует знать о JS` ) : null
)

function showNotification ( message ) {
    let options = {
        tag : "js-course",
        icon: 'https://garevna.github.io/js-course/images/my-photo.png',
        body: message
    }
    const notification = new Notification( 'garevna', options )
    notification.onclick = function ( event ) {
        window.open( 'https://github.com/garevna/js-course/wiki' )
    }
    notification.onerror = function ( event ) {
        document.body.appendChild (
            document.createElement ( "p" )
        ).innerText = "Notifications are not alowed"
    }
}


