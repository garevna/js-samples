onmessage = function ( event ) {
    console.dir ( event )
    showNotification ( event.data )
}

function showNotification ( data ) {
    console.dir ( data )
    const notification = new Notification( data.title, {
        icon: data.icon,
        image: data.image,
        body: data.message,
        requireInteraction: true,
        silent: true
    } )
    
    notification.onshow = function ( event ) {
        postMessage ({
            messageType: "images",
            image: notification.image.src,
            icon: notification.icon.src
        })
    }
    
    notification.onclose = function ( event ) {
        postMessage ({
            messageType: "text",
            text: "I'm worker. Notification has been closed"
        })
    }
}
