const messageWorker = new Worker( "./js/notifications-worker.js" )

messageWorker.postMessage({
    icon: 'https://garevna.github.io/js-course/images/a-level-ico.png',
    image: "https://garevna.github.io/js-course/images/AJAX.png",
    message: "Hello, students! Do you like JS ?",
    title: "garevna"
})

const addElem = tag => document.body.appendChild (
    document.createElement ( tag )
)

const addImage = url => addElem ( "img" ).src = url

messageWorker.onmessage = function ( event ) {
    if ( event.data.messageType === "images" ) {
      addImage ( event.data.image )
      addImage ( event.data.icon )
    } else addElem ( "p" ).innerText = event.data.text
    messageWorker.terminate()
}

messageWorker.onclick = function ( event ) {
    window.open ( "https://garevna.github.io/js-samples/#19", "_blank" )
}
