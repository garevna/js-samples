var messageWorker = new Worker("notification-worker.js")
messageWorker.postMessage( "Hello!" )
