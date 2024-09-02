(elems => elems.forEach(elem => elem && elem.remove()))(['input', 'header', '.logo'].map(selector => document.querySelector(selector)))

const elem = document.body.appendChild(document.createElement('picture-slider'))
elem.setAttribute('src', 'data_files/comics.json')

class PictureSlider extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, {
      pictures: [],
      container: this.createElem('figure'),
      currentIndex: 0,
      currentSlide: 0,
      music: this.musics[0]
    })

    Object.assign(this, {
      audio: this.createElem('audio', this.container)
    })

    Object.assign(this, {
      source: this.createElem('source', this.audio)
    })

    this.loadData(this.getAttribute('src'))

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(this.container)
    const style = this.createElem('style', shadow)
    style.textContent = getStyle()

    this.btnLeft = Object.assign(this.createElem('button', this.container), {
      id: 'left',
      innerHTML: '<',
      onclick: () => this.changePicture('left')
    })

    this.btnRight = Object.assign(this.createElem('button', this.container), {
      id: 'right',
      innerHTML: '>',
      onclick: () => this.changePicture('right')
    })
  }

  connectedCallback () {
    this.source.src = `https://garevna.github.io/js-samples/sounds/${this.music}.mp3`
    this.audio.play()
  }

  createElem (tagName, container) {
    return (!container ? document.body : container)
      .appendChild(document.createElement(tagName))
  }

  async loadData (jsonURL) {
    const pictures = await (await fetch(jsonURL)).json()
    Object.assign(this, {
      pictures,
      slides: [
        new Slide(pictures[0], this.container),
        new Slide(pictures[1], this.container)
      ]
    })
    this.slides[0].mcFromTo(100, 10)
    this.slides[1].init(100)
  }

  changePicture (direction) {
    const to = direction === 'left' ? 100 : -100
    const nextSlide = this.currentSlide === 0 ? 1 : 0
    const nextIndex = this.getNextIndex(direction)
    this.slides[nextSlide].setPicture(this.pictures[nextIndex])
    this.slides[nextSlide].init(-to)
    this.slides[this.currentSlide].mcFromTo(10, to, 0)
    this.slides[nextSlide].mcFromTo(-to, 10, 1)
    setTimeout(function () {
      this.currentSlide = nextSlide
      this.currentIndex = nextIndex
    }.bind(this), 1000)
  }

  getNextIndex (dir) {
    return dir === 'left'
      ? this.currentIndex === 0
        ? this.pictures.length - 1
        : this.currentIndex - 1
      : this.currentIndex === this.pictures.length - 1
        ? 0
        : this.currentIndex + 1
  }
}

PictureSlider.prototype.musics = [
  'ballerino',
  'calm-music',
  'music-box',
  'mystical-music',
  'run-away-with-me',
  'september-story',
  'story-unfolds',
  'violin-music'
]

customElements.define ('picture-slider', PictureSlider)

function Slide (imageURL, container) {
  this.imageURL = imageURL
  const elem = container.appendChild(document.createElement('div'))
  elem.style = `background-image: url(${imageURL});`
  this.init = x => Object.assign(elem.style, { left: x + '%' })
  this.setPicture = pictureURL => Object.assign(elem.style, {
    backgroundImage: `url(${pictureURL})`
  })

  this.mcFromTo = function (from, to, finalOpacity) {
    Object.assign(elem.style, {
      transition: 'none',
      left: from + '%',
      opacity: 1 - finalOpacity
    })
    setTimeout ( function () {
      Object.assign(elem.style, {
        transition: 'all 0.8s',
        left: to + '%',
        opacity: finalOpacity
      })
    }, 50)
  }
}

function getStyle () {
  return `
    figure {
      position: fixed;
      top: 10%;
      left: 0;
      bottom: 10%;
      right: 0;
      overflow: hidden;
      margin: 0;
    }
    button {
      position: absolute;
      top: 50%;
      font-size: 30px;
      z-index: 100;
      background: transparent;
      border: 0;
      color: white;
      text-shadow: 3px 3px 5px #00000090;
      outline: none;
      font-family: monospace;
    }
    button:hover {
      font-size: 32px;
      text-shadow: 2px 2px 4px #000000b0;
    }
    #left { left: 4%; }
    #right { right: 4%; }
    div {
      position: absolute;
      top: 10%;
      bottom: 10%;
      left: 10%;
      width: 80%;
      box-sizing: border-box;
      margin:0;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      transition: all 0.8s;
    }
  `
}
