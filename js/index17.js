const Slide = function ( imageURL, container ) {
    this.imageURL = imageURL
    let elem = container.appendChild (
      document.createElement ( 'div' )
    )
    elem.style = `
        position: absolute;
        top: 10%;
        left: 10%;
        bottom: 10%;
        right: 10%;
        transition: all 0.5s;
        background-image: url(${imageURL});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    `
    this.init = function ( x ) {
      elem.style.left = x + '%'
      elem.style.width = window.innerWidth * 0.8 + 'px'
    }
    this.setPicture = pictureURL => {
            elem.style.backgroundImage = `url(${pictureURL})`
    }
    this.mcFromTo = function ( from, to, finalOpacity ) {
        var slideWidth = window.innerWidth * 0.8
        elem.style.transition = 'none'
        elem.style.left = from + '%'
        elem.style.opacity = 1 - finalOpacity
        elem.style.width = slideWidth + 'px'
        setTimeout ( function () {
          elem.style.transition = 'all 0.8s'
          elem.style.left = to + '%'
          elem.style.opacity = finalOpacity
        }, 50 )
    }
}

const Slider = function ( sourseData ) {
    this.pictures = []
    this.container = this.createElem ( 'figure' )
    this.container.style = `
        position: fixed;
        top: 10%;
        left: 0%;
        bottom: 10%;
        right: 10%;
        overflow: hidden;
    `

    this.loadData ( sourseData )

    let currentIndex = 0
    let currentSlide = 0
    this.getNextIndex = dir => dir === 'left' ?
            ( currentIndex === 0 ?
                this.pictures.length - 1 : currentIndex - 1 ) :
            ( currentIndex === this.pictures.length - 1 ?
                0 : currentIndex + 1 )

    this.changePicture = direction => {
      let to = direction === 'left' ? 100 : -100
      let nextSlide = currentSlide === 0 ? 1 : 0
      var nextIndex = this.getNextIndex ( direction )
      this.slides [ nextSlide ].setPicture ( this.pictures [ nextIndex ] )
      this.slides [ nextSlide ].init ( -to )
      this.slides [ currentSlide ].mcFromTo ( 10, to, 0 )
      this.slides [ nextSlide ].mcFromTo ( -to, 10, 1 )
      setTimeout ( function () {
          currentSlide = nextSlide
          currentIndex = nextIndex
      }, 1000 )
    }


    this.btnLeft = this.createElem ( 'button' )
    this.btnLeft.onclick = () => this.changePicture ( "right" )
    this.btnRight = this.createElem ( 'button' )
    this.btnRight.onclick = () => this.changePicture ( "left" )
    this.btnLeft.innerHTML = '<i class="fas fa-angle-left"></i>'
    this.btnRight.innerHTML = '<i class="fas fa-angle-right"></i>'
    this.btnLeft.style = `
        position: absolute;
        top: 50%;
        left: 5%;
        font-size: 30px;
    `
    this.btnRight.style = `
        position: absolute;
        top: 50%;
        right: 5%;
        font-size: 30px;
    `
}
Slider.prototype.createElem = tagName => document.body.appendChild (
      document.createElement ( tagName )
)

Slider.prototype.loadData = async function ( jsonURL ) {
      let promise = fetch ( jsonURL )
                        .then ( response => response.json()
                    )
        this.pictures = await promise
        this.slides = []
        this.slides [ 0 ] = new Slide (
                        this.pictures [ 0 ],
                        this.container
        )
        this.slides [ 0 ].mcFromTo ( 100, 10 )
        this.slides [ 1 ] = new Slide (
                        this.pictures [ 1 ],
                        this.container
        )
        this.slides [ 1 ].init ( 100 )
}

var slider = new Slider ( 'data_files/pictures.json' )
