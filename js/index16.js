var pictures = [
  'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg',
  'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
  'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
  'https://www.grimdarkmagazine.com/wp-content/uploads/2021/08/roadside-picnic-header.jpeg'
]
var messages = [
  'Everything is about nothing...',
  'Wow! Nature, bio-mother!',
  'Monday starts on Saturday',
  'Roadside Picnic'
]

var picture = Object.assign(document.querySelector('img'), { width: 300 })
var messagePlaceholder = document.querySelector('header > h1 > span')

window.onhashchange = function (event) {
  var hash = location.hash.slice(1) - 0
  hash = hash > messages.length || hash < 0 ? 0 : hash
  location.hash = '#' + hash
  picture.src = pictures[hash]
  messagePlaceholder.innerText = messages[hash]
  localStorage.setItem('page' + hash, new Date().toLocaleString())
}
