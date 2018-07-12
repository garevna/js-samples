var User = function ( name = "user",
                      email = "user@sample.com",
                      photo = "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg" ) {
        this.name = name
        this.email = email
        this.photoURL = photo
        this.info = ''
}
User.__proto__.admin = {
        photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
        name: "admin"
}
User.prototype.messageBox = ( function () {
        var box = document.createElement ( 'div' )
        document.body.appendChild ( box )
        box.style = `
                position: fixed;
                bottom: 0;
                right: 0;
                width: 300px;
                height: 200px;
                overflow: auto;
                border: 1px solid gray;
                padding: 10px;
                background-color: #000;
        `
        box.picture = box.appendChild ( document.createElement ( 'img' ) )
        box.picture.style.width = "50px"
        box.name = box.appendChild ( document.createElement ( 'span' ) )
        box.name.style = "font-weight: bold; color: #9ab; padding-left:10px;"
        box.message = box.appendChild ( document.createElement ( 'textarea' ) )
        box.message.placeholder = "Сообщение"
        box.message.oninput = function ( event ) {
                event.target.parentNode.querySelector ( 'img' ).src = User.admin.photoURL
                event.target.parentNode.querySelector ( 'span' ).innerHTML = User.admin.name
        }
        box.message.style = "width: 100%; height: 100%;"
        return box
})()
User.prototype.write = function ( text ) {
        this.messageBox.picture.src = this.photoURL
        this.messageBox.name.innerHTML = this.name
        this.messageBox.message.value = text
}
User.prototype.read = function () {
        this.messageBox.picture.src = this.photoURL
        this.messageBox.name.innerHTML = this.name
        this.info = this.messageBox.message.value
        console.log ( `${this.name} прочитал сообщение:\n${this.info}` )
        this.messageBox.message.value = "OK"
}

var user1 = new User ( "Иван" )
var user2 = new User ( 'Alex', "alex@gmail.com", 'https://78.media.tumblr.com/3a5c4d080cdd9c57139170b5015e244c/tumblr_oycng531hQ1vzkjvvo1_1280.jpg' )
