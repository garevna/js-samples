const messageWorker = new Worker("./js-samples/js/notification-worker.js")
messageWorker.postMessage( "Hello!" )
alert( "Worker" )
messageWorker.terminate()
