onmessage = function ( event ) {
    console.log ( event )
    showNotification ( event.data )
}

function showNotification ( data ) {
    console.log ( data )
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
            image: event.target.image.src,
            icon: event.target.icon.src
        })
    }
    
    notification.onclose = function ( event ) {
        postMessage ({
            messageType: "text",
            text: "I'm worker. Notification has been closed"
        })
    }
}
