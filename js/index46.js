Notification.requestPermission(
    permission => permission === "granted" ? 
        showNotification () : null
)

function showNotification ( message ) {
    let options = {
//         icon: 'https://garevna.github.io/js-course/images/my-photo.png',
        image: "https://www.hrirrigation.com/wp-content/uploads/bg-home-2000px.jpg"
//         body: message
    }
    const notification = new Notification( 'garevna', options )
    notification.onclick = function ( event ) {
        window.open( 'https://github.com/garevna/js-course/wiki' )
    }
    notification.onerror = function ( event ) {
        console.warn ( "Notifications are not allowed" )
    }
}


