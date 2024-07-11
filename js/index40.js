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

const style = `
  position: absolute;
  top: 5%;
  bottom: 5%;
  left: 5%;
  right: 5%;
  transition: all 0.5s;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`

function moveSlide (slide, active) {
  Object.assign(slide.style, {
    left: `${ active ? 5 : -100 }%`,
    right: `${ active ? 5 : 100 }%`,
    opacity: active ? 1 : 0
  })
}

function createSlider (container) {
  Object.assign(pictures, {
    createSlide () {
      const slide = container
        .appendChild(document.createElement('figure'))
      slide.style = style
      slide.onclick = function () {
        this.iterator.next()
      }.bind(this)

      return slide
    },
    iterator: (function * () {
      const getNextPictureNum = function () {
        return this.currentPicture < this.length - 1 ? this.currentPicture + 1 : 0
      }.bind(this)

      const slides = [this.createSlide(), this.createSlide()]

      let currentSlide = 0
      this.currentPicture = 0

      while (true) {
        this.currentPicture = getNextPictureNum()
        slides[Math.abs(currentSlide - 1)]
          .style.backgroundImage = `url(${this[this.currentPicture]})                `
        moveSlide(slides[currentSlide], false)
        moveSlide(slides[Math.abs(currentSlide - 1)], true )
        currentSlide = Math.abs(currentSlide - 1)

        yield slides[currentSlide]
      }
    }.bind(pictures))()
  })
}

export function showSlider (section) {
  createSlider(section)
  pictures.iterator.next()
}

// export function showSlider () {
//   const section = document
//     .querySelector('[script="dynamic-import-1.js"]')
//     .shadowRoot
//     .querySelector('section')

//   createSlider(section)
//   pictures.iterator.next()
// }
