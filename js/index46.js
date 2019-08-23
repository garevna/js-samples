Notification.requestPermission().then (
    permission => permission === "granted" ? 
        showNotification ( `Что вам следует знать о JS` ) : null
)

showNotification ( message ) {
    let options = {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: message
    }
    const notification = new Notification( 'garevna', options )
    notification.onclick = function ( event ) {
        window.open( 'https://github.com/garevna/js-course/wiki' )
    }
    notification.onerror = function ( event ) {
        document.body.appendChild (
            document.createElement ( "p" )
        ).innerHTML = `<em style='color: red'>Error</p>`
        console.log ( event )
    }
}


