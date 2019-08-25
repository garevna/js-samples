var messageWorker = new Worker("js/notification-worker.js")
messageWorker.postMessage( "Hello!" )
