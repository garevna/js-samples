const configs = {
  host: 'https://garevna.github.io/js-samples/images',
  avatars: [
    'batman.png',
    'cute-boy.png',
    'spectacles-guy.png',
    'avatar-cartoon.jpg',
    '3d-human-avatar.jpg',
    'avatar-01.png',
    'girl-avatar.png',
    'girl-avatar-1.png'
  ],
  admin: {
    photoURL: 'https://garevna.github.io/js-samples/images/admin-avatar.gif',
    name: 'Admin'
  }
}

const User = function (name = 'user', email = 'user@sample.com', photoURL) {
  Object.assign(this, {
    name,
    email,
    photoURL: this.getAvatar(photoURL),
    info: ''
  })
}

const createMessageBox = function (admin) {
  const box = document.body.appendChild(document.createElement('div'))
  const addElem = tag => box.appendChild(document.createElement(tag))
  Object.assign(box, {
    style: `
      position: fixed;
      bottom: 0;
      right: 0;
      width: 300px;
      height: 200px;
      overflow: auto;
      border: 1px solid gray;
      padding: 12px;
      background-color: #000;
    `,
    picture: addElem('img'),
    name: addElem('span'),
    message: Object.assign(addElem('textarea'), { admin })
  })

  Object.assign(box.name, { style: 'font-weight: bold; color: #9ab; padding-left:10px;' })
  Object.assign(box.picture.style, { width: '50px' })

  Object.assign(box.message, {
    placeholder: 'Message',
    style: 'width: 100%; height: 100%;',
    oninput (event) {
      console.dir(this)
      this.parentNode.querySelector('img').src = this.admin.photoURL
      this.parentNode.querySelector('span').innerHTML = this.admin.name
    }
  })
  return box
}

Object.assign(User.prototype, {
  messageBox: createMessageBox(configs.admin),

  host: configs.host,

  avatars: configs.avatars,

  getAvatar (photo) {
    const name = photo || this.avatars[Math.round(Math.random() * (this.avatars.length - 1))]
    return `${this.host}/${name}`
  },

  setActive () {
    this.messageBox.picture.src = this.photoURL
    this.messageBox.name.innerHTML = this.name
  },

  write (text) {
    this.setActive()
    this.messageBox.message.value = text
  }
})

var users = [
  new User('Andrew', null, 'batman.png'),
  new User('Alex', 'alex@gmail.com', 'cute-boy.png'),
  new User('Bob', 'bob777@gmail.com', 'spectacles-guy.png'),
  new User('Frederic', 'frodo-888@gmail.com', 'avatar-cartoon.jpg'),
  new User('Stephan', 'fima999@gmail.com', '3d-human-avatar.jpg')
]

users.forEach(function (user, index) {
  setTimeout(function () {
    user.write(`Hello, I'm ${user.name}`)
  }, 5000 * index)
})
