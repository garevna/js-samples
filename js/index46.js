const messageWorker = new Worker( "./js/notifications-worker.js" )

messageWorker.postMessage({
    icon: 'https://garevna.github.io/js-course/images/my-photo.png',
    image: "https://garevna.github.io/js-course/images/columns.gif",
    message: "Hello, students!",
    title: "garevna"
})

const addElem = tag => document.body.appendChild (
    document.createElement ( tag )
)

const addImage = url => addElem ( "img" ).src = url

messageWorker.onmessage = function ( event ) {
    console.dir ( event )
    console.dir ( event.data )
    if ( event.data.messageType === "images" ) {
      addImage ( event.data.image )
      addImage ( event.data.icon )
    } else addElem ( "p" ).innerText = event.data.text
    messageWorker.terminate()
}
