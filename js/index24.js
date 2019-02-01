let posts = null

const writeHTML = html => document.body.insertAdjacentHTML ( "beforeEnd", html )

const showFileName = fileName => writeHTML ( `<h3>${fileName}</h3>` )

const showPostName = name => writeHTML ( `<h5 style="color:#ffa">${name}</h5>` )

const showPost = postContent => writeHTML ( `<p style="color:#99a; font-size:10px; word-wrap: break-word; border: inset 1px; padding: 10px 20px; overflow: auto;">${postContent}</p>` )

const showError = err => writeHTML ( `<p style="color:red">${err}</p>` )


const startPoint = "sample-01.json"

async function* postGenerator ( startURL ) {
    let nextJsonFile = startURL

    const getJSON = fileName =>
        fetch ( `data_files/${fileName}` )
            .then ( response => response.json() )
            .catch ( err => console.warn( err ) )

    const getPostContent = fileName =>
        fetch ( `data_files/posts/${fileName}` )
            .then ( response => response.text() )
            .catch ( err => console.warn( err ) )

    while ( nextJsonFile ) {
        const json = await getJSON ( nextJsonFile )
        showFileName ( nextJsonFile )
        nextJsonFile = json.next
        for ( let item of json.content ) {
            showPostName ( item.post )
            showPost ( await getPostContent ( item.post ) )
        }
        yield nextJsonFile
    }
}

async function showAllPosts () {
    const postsIterator = postGenerator ( startPoint )
    let stop = false
    while ( !stop ) {
        let step = await postsIterator.next()
        stop = step.done
    }
}

showAllPosts ()
