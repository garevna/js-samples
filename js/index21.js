(elem => elem && elem.remove())(document.getElementsByTagName('input')[0])

const pictures = [
  "https://garevna.github.io/js-quiz/images/148.jpg",
  "https://garevna.github.io/js-quiz/images/149.jpg",
  "https://garevna.github.io/js-quiz/images/150.jpg",
  "https://garevna.github.io/js-quiz/images/151.jpg",
  "https://garevna.github.io/js-quiz/images/316.jpg",
  "https://garevna.github.io/js-quiz/images/317.jpg",
  "https://garevna.github.io/js-quiz/images/402.jpg",
  "https://garevna.github.io/js-quiz/images/405.jpg"
]

pictures.createSlide = function () {
  const slide = document.body
    .appendChild(document.createElement('figure'))
  slide.style = `
    position: fixed;
    top: 10%;
    bottom: 10%;
    left: 10%;
    right: 10%;
    transition: all 0.5s;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  `
  slide.onclick = function () {
    this.iterator.next ()
  }.bind(this)

  return slide
}

pictures.iterator = (function * () {
  function moveSlide (slide, active) {
    slide.style.left = `${ active ? 10 : -100 }%`
    slide.style.right = `${ active ? 10 : 100 }%`
    slide.style.opacity = active ? 1 : 0
  }
  let getNextPictureNum = function () {
    return this.currentPicture < this.length - 1 ? this.currentPicture + 1 : 0
  }.bind(this)

  const slides = [this.createSlide(), this.createSlide()]
  let currentSlide = 0
  this.currentPicture = 0

  while (true) {
    this.currentPicture = getNextPictureNum ()
    slides[Math.abs(currentSlide - 1)]
      .style.backgroundImage = `url(${this[this.currentPicture]})                `
    moveSlide(slides[currentSlide], false)
    moveSlide(slides[Math.abs(currentSlide - 1)], true )
    currentSlide = Math.abs(currentSlide - 1)

    yield slides[currentSlide]
  }
}).call(pictures)

pictures.iterator.next()
