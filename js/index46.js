const messageWorker = new Worker("./js/notifications-worker.js")
messageWorker.postMessage( "Hello!" )
alert( "new" )
// messageWorker.terminate()
