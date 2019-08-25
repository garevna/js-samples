onmessage = function ( event ) {
    Notification.requestPermission(
        permission => {
            console.log ( "permission", permission )
            console.log ( "message", event.data )
            permission === "granted" ? 
            showNotification ( event.data ) : null
        }
    )
}

console.log ( "worker is working..." )

function showNotification ( message ) {
    let options = {
        icon: 'https://garevna.github.io/js-course/images/my-photo.png',
        image: "https://bipbap.ru/wp-content/uploads/2017/09/1kgwYBuQw7t5etDwP9o1XE9H-640x410.jpeg"
        body: message
    }
    const notification = new Notification( 'garevna', options )
}
