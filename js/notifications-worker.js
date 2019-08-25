onmessage = function ( event ) {
    showNotification ( event.data )
}

function showNotification ( data ) {
    console.dir ( data.icon )
    console.dir ( data.image )
    const notification = new Notification( data.title, {
        icon: data.icon,
        image: data.image,
        body: data.message,
        requireInteraction: true,
        silent: true
    } )
    
    notification.onshow = function ( event ) {
        console.log ( notification.image )
        postMessage ({
            messageType: "images",
            image: notification.image,
            icon: notification.icon
        })
    }
    
    notification.onclose = function ( event ) {
        postMessage ({
            messageType: "text",
            text: "I'm worker. Notification has been closed"
        })
    }
}
