Notification.requestPermission().then (
    permission => permission === "granted" ? 
        showNotification ( `Что вам следует знать о JS` ) : null
)

showNotification ( message ) {
    var notification = new Notification( 'garevna', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: message
    })
}

notification.onclick = function () {
    window.open( 'https://github.com/garevna/js-course/wiki' )
}
