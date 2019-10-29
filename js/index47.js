class registerComponent extends HTMLElement {
    constructor () {
        super();
        this.shadow = this.attachShadow ({ mode: "closed" });
    }
    connectedCallback () {
        this.shadow.innerHTML = `
            <link rel="stylesheet" href="https://garevna-form-data.glitch.me/style.css">
            <header>
                <img src="https://garevna-form-data.glitch.me/assets/cat.gif" width="30">
                <small id="logMessage"> Sign in</small>
                <input id="login" placeholder="login">
            </header>

            <main>
              <section id="registration" style="display: none">
                  <h4>Registration</h4>
                  <p id="message" style="color: #f50"></p>
                  <form id="form">
                    <p>Name</p>
                    <input id="userName" name="name" placeholder="Name">
                    <p>Age</p>
                    <input type="number" id="userAge" name="age" placeholder="Age">
                    <p>Your Photo</p>
                    <input type="file" id="avatar" name="avatar">
                    <img id="userPhoto" src="https://forexi.ru/wp-content/uploads/2019/02/teacher1.png" width="70">
                  </form>
                  <button id="submit">Submit</button>
              </section>

            </main>
        `;
        
        let [ userName, userAge, avatar, message, submit, registration, userInput, form ] =
                [ "userName", "userAge", "avatar", "message", "submit","registration", "login", "form" ]
                    .map ( item => this.shadow.getElementById ( item ) );
        
        const header = this.shadow.querySelector ( "header" );
        const shadow = this.shadow;

        function getInput ( users ) {

            let logins = Object.keys ( users );

            userInput.oninput = event => {
                let test = logins.filter (
                    login => login.indexOf ( event.target.value ) !== -1
                ).length > 0;

                event.target.style.color = test ? "green" : "red";
                event.target.title = test ? "..." : "There are no such user in DB";
            };

            return new Promise (
                ( resolve, reject ) => {
                    userInput.onchange = event => {
                        let userLogin = event.target.value;
                        let res = logins.find ( login => login === event.target.value );

                        userInput.remove();

                        !res ? reject ( userLogin ) : resolve ( userLogin )
                    };
                }
            )
        }

        async function getLogin () {

            let users = await (
                await fetch ( "https://garevna-form-data.glitch.me/forms/all" )
            ).json();

            return await getInput ( users )
        }

        const resolve = userLogin => {
            let dataURL = `https://garevna-form-data.glitch.me/forms/${userLogin}`

            async function getFormData ( url ) {
                let formData = await ( await fetch ( url ) ).formData()
                let user = {}
                formData.forEach (
                    prop => prop instanceof File ? 
                        shadow.appendChild (
                            document.createElement ( "img" )
                        ).src = URL.createObjectURL ( prop ) :
                        shadow.appendChild (
                            document.createElement ( "p" )
                        ).innerText = prop
                );
            }

            getFormData ( dataURL );
            header.remove();
        }

        const register = login => {
            registration.style.display = "block";
            message.innerText = "";
            const validateImage = event => {
              message.innerText = 
                  avatar.files[0].type.indexOf ( "image" ) === 0 ? avatar.files[0].size < 100000 ? "" : 
                      "File is too large" : "It's not an image file";
              const userPhoto = shadow.getElementById ( "userPhoto" );
              userPhoto.src = URL.createObjectURL( event.target.files [0] );
            }

            avatar.onchange = validateImage.bind( this );

            let ready = () => userName.value.length > 1 && userAge.value < 100 && userAge.value > 5 && !message.innerText;

            submit.onclick = event => {

                if ( !ready() ) {
                  setTimeout ( ()=> {
                    message.innerText = "User data will not be saved";
                    registration.style.display = "none";
                  }, 1500 );

                  return;
                }
                
                let formData = new FormData ( form );
                
                fetch ( `https://garevna-form-data.glitch.me/form/${login}`, {
                    method: "POST",
                    body: formData
                }).then ( response => {
                  registration.style.display = "none";
                  header.remove();
                  resolve ( login );
                });
            };
        }


        getLogin ().then ( resolve, register )
    }
}

customElements.define (
    "sign-up",
    registerComponent
)

document.getElementsByTagName ( "input" )[0].remove();
document.querySelector ( "span.js" ).remove();
document.querySelector ( "span.samples" ).remove();
document.getElementsByTagName ( "img" )[0].remove();

document.body.appendChild (
    document.createElement ( "sign-up" )
)
