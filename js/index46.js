Notification.requestPermission(
    permission => permission === "granted" ? 
        showNotification () : null
)

function showNotification ( message ) {
    let options = {
//         icon: 'https://garevna.github.io/js-course/images/my-photo.png',
        image: "http://dreempics.com/img/picture/Jun/03/684c20c33d76082098a4e9c47efd1df3/3.jpg"
//         body: message
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


