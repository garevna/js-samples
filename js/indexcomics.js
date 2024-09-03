(elems => elems.forEach(elem => elem && elem.remove()))(['input', 'header', '.logo'].map(selector => document.querySelector(selector)))

const host = 'https://garevna.github.io/js-samples'

const elem = document.body.appendChild(document.createElement('picture-slider'))
elem.setAttribute('src', 'data_files/comics.json')

class PictureSlider extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, {
      pictures: [],
      container: this.createElem('figure'),
      currentIndex: 0,
      currentSlide: 0
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
    //
  }

  static get observedAttributes() {
    return ['music']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    
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

const formatString = str => str.replaceAll('-', ' ')
  .split(' ')
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(' ')

document.head
  .appendChild(document.createElement('style'))
  .textContent = `
    .play-button, .media-button {
      position: fixed;
      border: 0;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
      cursor: pointer;
    }
    .play-button {
      top: 20px;
      left: 16px;
      width: 24px;
      height: 24px;
      border-color: transparent transparent transparent #09b;
      transition: 100ms all ease;
      border-style: solid;
      border-width: 12px 0 12px 24px;
    }

    .play-button.paused {
      border-style: double;
      border-width: 0px 0 0px 24px;
    }

    .play-button:hover {
      border-color: transparent transparent transparent #079;
    }

    .media-button {
      position: fixed;
      top: 12px;
      right: 16px;
      border-radius: 50%;
      border: solid 3px #fa0;
      width: 48px;
      height: 48px;
      font-size: 28px;
      color: #fa0;
      z-index: 50;
    }

    .media-button:hover {
      border: solid 3px #f70;
      color: #f70;
    }

    .music-title {
      position: fixed;
      top: 0;
      left: 48px;
    }
  `

const media = [
  'desolate-fields-of-sorrow',
  'enchanted-moonlight-ballad',
  'eternal-twilight-sonata',
  'haunted-shadows-on-hills',
  'majestic-orchestral-calmness',
  'midnight',
  'midnight-moonlight-echoes',
  'robotic-dance-waltz',
  'serene-celestial-opera-peace',
  'serene-grand-orchestral-journey',
  'tranquil-cityscape-reflections',
  'music-box',
  'mystical-music',
  'violin-music'
]

const [playButton, mediaButton] = [1, 2].map(() => document.body.appendChild(document.createElement('button')))

const audio = document.body.appendChild(document.createElement('audio'))
audio.setAttribute('src', media[0])
audio.setAttribute('crossorigin', 'anonymous')

const audioContext = new AudioContext(window.AudioContext || window.webkitAudioContext)
const track = audioContext.createMediaElementSource(audio)
track.connect(audioContext.destination)

Object.assign(playButton, {
  playing: false,
  className: 'play-button',
  onclick () {
    audioContext.state === 'suspended' && audioContext.resume()
    if (this.playing) audio.pause()
    else audio.play()
    this.className = this.playing ? 'play-button' : 'play-button paused'
    this.playing = !this.playing
  }
})

Object.assign(mediaButton, {
  className: 'media-button',
  innerText: '♫',
  media: 0,
  onclick () {
    playButton.playing && playButton.dispatchEvent(new Event('click'))
    this.media = this.media >= media.length - 1 ? 0 : this.media + 1
    audio.setAttribute('src', `${host}/sounds/${media[this.media]}.mp3`)
    !playButton.playing && playButton.dispatchEvent(new Event('click'))
    demo.innerText = formatString(media[this.media])
  }
})

audio.setAttribute('src', `${host}/sounds/${media[0]}.mp3`)

const demo = document.body.appendChild(document.createElement('h4'))
Object.assign(demo, {
  innerText: formatString(media[0]),
  className: 'music-title'
})

audio.addEventListener('ended', () => {
  playButton.playing = false
}, false)
