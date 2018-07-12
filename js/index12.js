var User = function ( name = "user",
                      email = "user@sample.com",
                      photo = "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png" ) {
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
        `
        box.picture = box.appendChild ( document.createElement ( 'img' ) )
        box.picture.style.width = "50px"
        box.name = box.appendChild ( document.createElement ( 'span' ) )
        box.name.style.fontWeight = "bold"
        box.name.style.color = "#789"
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

var user = new User ( "Иван" )
