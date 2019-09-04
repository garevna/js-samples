let DB

const openDB = ( nameDB, verDB ) => new Promise ( ( resolve, reject ) => 
    Object.assign ( indexedDB.open( nameDB, verDB ), {
        onupgradeneeded: event => resolve ( event.target.result ),
        onversionchange: event => resolve ( event.target.result ),
        onsuccess: event => resolve ( event.target.result ),
        onerror: event => reject ( event.target.error )
    })
)

const getDBVersion = dbName => new Promise (
    ( resolve, reject ) => Object.assign ( indexedDB.open( dbName ), {
        onsuccess: event => {
            let ver = event.target.result.varsion
            event.target.result.close()
            resolve ( ver )
        },
        onerror: event => reject ( event.target.error )
    })
)

const getAllData = ( db, storeName ) => new Promise (
    ( resolve, reject ) => Object.assign (
            db.transaction( [ storeName ] )
                .objectStore( storeName ).getAll(), 
            {
                onsuccess: event => resolve ( event.target.result ),
                onerror: event => reject ( event.target.error )
            }
        )
)

openDB ( "keywordsDB" ).then (
    response => getAllData ( response, "lessonStore" )
        .then ( response => console.log ( "Data:\n", response ) ),
    error => console.warn ( error )
)
