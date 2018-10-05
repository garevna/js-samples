var User = function ( name = "user",
                      email = "user@sample.com",
                      photo = User.getAvatar() ) {
        this.name = name
        this.email = email
        this.photoURL = photo
        this.info = ''
}
User.admin = {
        photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
        name: "admin"
}
User.getAvatar = function () {
     return this.avatars.shift ()
}
User.avatars = [
     "https://pre00.deviantart.net/50f9/th/pre/i/2011/217/e/8/pikachu_2_by_nostalgiaattack-d45jd3i.png",
     "https://cdn.diversityavatars.com/wp-content/uploads/2018/01/Vector-Smart-Object-5.png",
     "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png",
     "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-L3-icon.png",
     "https://findicons.com/files/icons/1072/face_avatars/300/i05.png",
     "http://www.iconarchive.com/download/i51043/hopstarter/halloween-avatars/Gomez.ico",
     "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/256/Zombie-2-icon.png",
     "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
]
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

var users = []
users.push ( new User ( "Иван" ) )
users.push ( new User ( 'Alex', "alex@gmail.com" ) )
users.push ( new User ( 'Bob', "bob777@gmail.com" ) )
users.push ( new User ( 'Dima', "dima888@gmail.com" ) )
users.push ( new User ( 'Fima', "fima999@gmail.com" ) )

var k = 1
users.forEach ( 
     function ( user ) {
          setTimeout ( 
               function () {
                    user.write ( `Hello, I'm ${user.name}` )
               }, 3000 * k++
          )
} )
