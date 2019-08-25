Notification.requestPermission( permission => showNotification ({
    icon: "https://garevna.github.io/js-course/images/my-photo.png",
    image: "https://cn.opendesktop.org/img/b/2/d/5/cfd19f550736133723633e53ba0b05def2e4.jpg",
    message: "Hello, students! Welcome to JS!",
    title: "garevna"
}) )

function showNotification ( data ) {
    const notification = new Notification( data.title, {
        icon: data.icon,
        image: data.image,
        body: data.message,
        requireInteraction: true,
        silent: true
    })
}
