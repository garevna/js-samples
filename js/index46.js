Notification.requestPermission(
    permission => permission === "granted" ? 
        showNotification ( `Что вам следует знать о JS` ) : null
)

function showNotification ( message ) {
    let options = {
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFUtDreoTbGcj2E3DGpen9jEA9iJxXIx577Z8j9Rb4L3O7lyxT',
        body: message
    }
    const notification = new Notification( 'garevna', options )
    notification.onclick = function ( event ) {
        window.open( 'https://github.com/garevna/js-course/wiki' )
    }
}


