var pictures = [
  "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
  "https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg",
  "http://pwtthemes.com/demo/hannari/wp-content/uploads/2013/03/unicorn-wallpaper.jpg"
]
var messages = [
  'Everything is about nothing...',
  'Wow! Nature, bio-mother!',
  'Monday starts on Saturday',
  'Roadside Picnic'
]

var picture = Object.assign(document.querySelector('img'), { width: 300 })
var messagePlaceholder = document.querySelector('header > h1 > span')
console.log(messagePlaceholder)

window.onhashchange = function (event) {
  var hash = 1 * location.hash.substr(1)
  var hash = hash > 3 || hash < 0 ? 0 : hash
  location.hash = '#' + hash
  picture.src = pictures[hash]
  messagePlaceholder.innerText = headers[hash]
  localStorage.setItem('page' + hash, new Date().toLocaleString())
}
