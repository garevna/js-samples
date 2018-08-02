var pictures = [
  "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
  "https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg",
  "http://pwtthemes.com/demo/hannari/wp-content/uploads/2013/03/unicorn-wallpaper.jpg"
]
var Slider = function ( images ) {
    this.pictures = images
    this.createElem = el => document.body.appendChild ( document.createElement ( el ) )
    this.picture = this.createElem ( 'img' )
    this.picture.src = this.pictures [0]
    this.picture.style = `
        position: absolute;
        top: 10%;
        left: 10%;
        max-width: 80%;
        max-height: 80%;
        transition: all 0.8s;
    `
    var pict = this.createElem ( 'img' )
    pict.style = `
            opacity: 0;
            position: absolute;
            top: 10%;
            max-width: 80%;
            max-height: 80%;
            transition: all 0.8s;
    `
    this.btnLeft = this.createElem ( 'button' )
    this.btnLeft.onclick = () => this.changePicture ( "right" )
    this.btnRight = this.createElem ( 'button' )
    this.btnRight.onclick = () => this.changePicture ( "left" )
    this.btnLeft.innerText = '<'
    this.btnRight.innerText = '>'
    this.btnLeft.style = `
        position: absolute;
        top: 30%;
        left: 5%;
    `
    this.btnRight.style = `
        position: absolute;
        top: 30%;
        right: 5%;
    `
    this.currentIndex = 0
    this.fadeOut = ( dir ) => {
        this.picture.style.left = dir === 'left' ? "100%" : "-100%"
        this.picture.style.opacity = "0"
    }
    this.changePicture = direction => {
        this.fadeOut ( direction )
        pict.style.left = direction === 'left' ? "100%" : "-100%"
        pict.style.opacity = '0'
        pict.src = this.getNextPictureURL ( direction )
        setTimeout ( function () {
            pict.style.opacity = '1'
            pict.style.left = "10%"
        }, 800 )

        setTimeout ( function () {
            this.picture = JSON.parse ( JSON.stringify ( pict ) )
        }, 800 )
    }
    this.getNextPictureURL = direction => {
            this.currentIndex = direction === 'right' ? (
                    this.currentIndex < this.pictures.length - 1 ?
                    this.currentIndex + 1 : 0
                ) : this.currentIndex > 0 ? this.currentIndex - 1 :
                    this.pictures.length - 1
            return this.pictures [ this.currentIndex ]
    }
}

var slider = new Slider ( pictures )
