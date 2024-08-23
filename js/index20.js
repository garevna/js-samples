document.querySelector('#input_field').remove()
document.querySelector('header').remove()

const addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))

document.body.style.background = '#000'

class Bankomat extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    Object.assign(addElem('style', shadow), {
      textContent: this.css
    })

    this.wrapper = Object.assign(addElem('section', shadow), {
      className: 'wrapper'
    })

    Object.assign(this, {
      picture: Object.assign(addElem('img', this.wrapper), {
        className: 'bankomat'
      }),
      cardsPlace: addElem('figure', this.wrapper),
      message: Object.assign(addElem('div', this.wrapper), {
        style: `
          width: 90%;
          margin-top: 48px;
          border: solid 1px #ddd;
          border-radius: 4px;
          padding: 8px 16px;
        `
      })
    })

    this.setPicture('normal')
  }

  setPicture (mode) {
    this.picture.src = this.pictures[mode]
  }

  async inputData (promptText) {
    this.setPicture('input')
    this.message.innerText = promptText
    const elem = addElem('input', bankomat.message)
    const promise = new Promise(resolve => {
      elem.onchange = function (event) {
        resolve(event.target.value)
        event.target.remove()
      }
    })

    return promise
  }
    
  async insertCard (card) {
    const pin = await this.inputData('Enter the pincode:')
    if (!card.testPin(pin)) return

    this.message.innerHTML = ''
    this.setPicture('active')

    this.options
      .forEach((option, index) => {
        const id = `option${index}`
        Object.assign(addElem('input', this.message), {
          type: 'radio',
          name: 'operation',
          id,
          value: index,
          onclick: async function (event) {
            const sum = index ? await this.inputData('Enter the amount:') : 0
            card[['showCash', 'withdrawal', 'addCash'][index]](pin, sum)
            
            this.setPicture('normal')
          }.bind(this)
        })
        Object.assign(addElem('label', this.message), {
          for: id,
          innerText: this.options[index]
        })
        addElem('br', this.message)
      })
  }
}

Object.assign(Bankomat.prototype, {
  pictures: {
    active: 'https://garevna.github.io/js-samples/pictures/bankomat-active.jpg',
    input: 'https://garevna.github.io/js-samples/pictures/bankomat-input.jpg',
    normal: 'https://garevna.github.io/js-samples/pictures/bankomat-normal.jpg',
    card: 'https://garevna.github.io/js-samples/pictures/bankomat-card.jpg'
      
  },
  options: [
    'View account balance',
    'Withdraw cash',
    'Recharge your card'
  ],
  css: `
      .wrapper {
        width: 100%;
        font-family: monospace, Arial;
        font-size: 16px;
        padding: 32px;
      }
      figure {
        width: 80%;
        padding: 16px 8px;
        height: 120px;
        overflow: auto;
        border: solid 1px #777;
        margin-top: 48px;
      }
      .bankomat {
        width: 40%;
        transition: all 1s;
      }
      button {
        position: absolute;
        top: 48px;
        right: 16px;
      }
      .card {
        width:20%;
        margin: 2%;
        float: left;
        transition: all 1s;
      }
      p { clear: both; padding-top: 24px; }
      * {
        backgrond-color: transparent;
        color: #ddd;
      }
      input, button {
        font-size: 16px;
        padding: 8px 12px;
        color: #888;
        margin-left: 8px;
      }
      [type="radio"] {
        appearance: none;
	    width: 20px;
	    height: 20px;
	    border: 2px solid #777;
	    border-radius: 50%;
	    background-clip: content-box;
	    padding: 3px;
        vertical-align: middle;
        margin: 8px;
      }
      [type="radio"]:checked {
	    background-color: #090;
      }
      .denied {
        color: #D00;
      }
    `
})

class Card {
  constructor (bankomat) {
    this.number = Math.round(Math.random() * 10000000)
    const pincode = prompt('Set pincode for the card ' + this.number)
    let cash = 0

    function getCash (sum) {
      cash -= sum
      return sum
    }

    this.testPin = function (pin) {
      pincode !== pin && this.showMessage('<b class="denied">Invalid pincode. Access denied</b>')
      return pincode === pin
    }

    this.showCash = function (pin) {
      this.testPin(pin) && this.showMessage(`Account amount: ${cash} UAH`)
    }

    this.addCash = async function (pin, sum) {
      const amount = parseInt(sum)
      if (amount) {
        cash += amount
        this.showMessage('Success. Account amount has been replenished.')
      } else this.showMessage('<b class="denied">Operation failed. Invalid amount.<b>')
    }

    this.withdrawal = function (pin, sum) {
      const amount = parseInt(sum)
      this.testPin(pin)
        ? amount && amount <= cash
          ? getCash(amount) && this.showMessage(`Get the money: ${amount}`)
          : this.showMessage('<b class="denied">Not enough money in the account.</b>')
        : null
    }

    this.showMessage = function (text) {
      bankomat.message.innerHTML = text
    }
    
    this.elem = Object.assign(addElem('img', bankomat.cardsPlace), {
      src: bankomat.pictures.card,
      className: 'card',
      onclick: function (event) {
        bankomat.setPicture('active')
        bankomat.insertCard(this)
      }.bind(this),
    })
  }
}

customElements.define('bankomat-element', Bankomat)

const bankomat = addElem('bankomat-element')

const button = Object.assign(addElem('button', bankomat.wrapper), {
  innerText: 'Create new card',
  bankomat,
  onclick (event) {
    const card = new Card(bankomat)
  }
})

