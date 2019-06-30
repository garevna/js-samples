document.getElementsByTagName ( "input" ).remove()

var addElem = ( tagName, container ) =>
    ( container ? container : document.body )
        .appendChild (
            document.createElement ( tagName )
        )

addElem ( "script", document.head )
    .src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"
addElem( "style", document.head )
    .textContent = `
        section {
            position: absolute;
            top: 200px;
            left: 10%;
            right: 10%;
            height: calc(100% - 220px);
            border: solid 1px #888;
            padding: 10px 20px;
        }
        input {
            padding: 5px 10px;
        }
    `

const main = addElem ( "main" )

main.innerHTML = `
  <section id="endpoints">
      <h3>endpoints:</h3>
      <ul>
        <li>https://a-level-json-server.glitch.me/students</li>
        <li>https://a-level-json-server.glitch.me/teachers</li>
        <li>https://a-level-json-server.glitch.me/lessons</li>
      </ul>
  </section>
  <section id="registration">
      <form id="registrationForm">
        <input name="user-name" placeholder="Enter your name">
        <input type="password" id="pass-1" placeholder="Set your password" style="color: red;">
        <input type="password" id="pass-2" placeholder="Repeat your password" disabled="">
        <input type="hidden" value="" name="pass-hash">
        <input type="hidden" value="" name="user-photo">
        <img src="https://avatarko.ru/img/kartinka/1/multfilm_gomer.png" id="user-photo-preview" width="80">
        <input type="file">
      </form>
      <button onclick="registerUser()" id="register-button">Register</button>
  </section>
  <section id="userInfo">
    <h4></h4>
    <img src=null width="80">
  </section>
`

let currentUser = null
document.getElementById ( "userInfo" ).style.display = "none"

document.querySelector( "input[type='file']" )
    .onchange = function ( event ) {
        let photo = event.target.files[0]
        if ( photo.type.indexOf ( "image" ) !== 0 ) return
        let picture = URL.createObjectURL ( photo )
        document.getElementById ( "user-photo-preview" ).src = picture
        document.getElementsByName ( "user-photo" )[0].value = picture
    }

document.getElementById ( "pass-2" ).oninput = function ( event ) {
    event.target.valid = event.target.value === document.getElementById ( "pass-1" ).value
    event.target.style.color = event.target.valid ? "green" : "red"
}

document.getElementById ( "pass-2" ).onchange = function ( event ) {
    event.target.valid ? 
        document.getElementsByName ( "pass-hash" )[0]
            .value = Sha256.hash ( event.target.value ) : null
}

function registerUser() {
    let formData = new FormData(
        document.getElementById ( "registrationForm" )
    )
    let result = {}
    formData.forEach (
      ( val, key ) => Object.assign ( result, { [key]: val } )
    )
    fetch("https://a-level-json-server.glitch.me/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ( result )
    }).then ( response => response.json() )
        .then ( response => {
            currentUser = response 
            document.body.querySelector ( "#showUserInfo > h4" )
                .innerText = currentUser[ "user-name" ]
            document.body.querySelector ( "#showUserInfo > img" )
                .src = currentUser[ "user-photo" ]
            document.cookie = `userId=${currentUser.id}`
            document.getElementById ( "registration" ).style.display = "none"
            document.getElementById ( "userInfo" ).style.display = "block"
        })
}
