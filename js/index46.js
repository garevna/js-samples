var messageWorker = new Worker("https://garevna.github.io/js-samples/js/notification-worker.js")
messageWorker.postMessage( "Hello!" )
alert( "Worker" )
messageWorker.terminate()
