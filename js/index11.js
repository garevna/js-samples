location.search = '?name=garevna,date=10.07.2018'

function getSearchObject () {
        var obj = {}
        location.search.slice(1).split(',')
                .map ( x => x.split('=') )
                .map ( function ( item ) {
                        this[ item [0] ] = item [1]
        }, obj )
        return obj
}

var searchObject = getSearchObject ()
for ( var rec in searchObject ) {
        document.body.innerHTML += `<p>${rec}: ${searchObject[rec]}</p>`
}
