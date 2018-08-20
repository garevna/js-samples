const addElement = ( tagName, container ) =>
    ( container ? container : document.body ).appendChild (
          document.createElement ( tagName )
    )

class BankomatElement extends HTMLElement {
        constructor() {
                super ()
                this.wrapper = document.createElement ( 'section' )
                this.wrapper.className = "wrapper"
                this.picture = addElement ( 'img', this.wrapper )

                this.cardsPlace = addElement ( 'div', this.wrapper )

                this.picture.className = "bankomat"
                this.setPicture ( "normal" )
                this.message = addElement ( 'p', this.wrapper )


                let style = document.createElement ( 'style' )
                style.textContent = `
                        .wrapper {
                            width: 100%;
                            font-family: monospace, Arial;
                            font-size: 16px;
                            padding: 30px;
                        }
                        div { width: 100%; padding: 30px; height: 100px; }
                        .bankomat {
                            width:25%;
                            float: left;
                            transition: all 1s;
                        }
                        button {
                          position: absolute;
                          bottom: 20px;
                          left: 20px;
                        }
                        .card {
                            width:20%;
                            margin: 2%;
                            float: left;
                            transition: all 1s;
                        }
                        p { clear: both; padding-top: 20px; }
                        * {
                            backgrond-color: transparent;
                            color: #5f5;
                        }
                        input, button {
                            font-size: 16px;
                            padding: 5px 10px;
                            color: #789;
                        }
                        [type="radio"] {
                            width: 20px;
                            height: 20px;
                        }
                `

                this.shadow = this.attachShadow ( { mode: 'closed' } )
                this.shadow.appendChild ( style )
                this.shadow.appendChild ( this.wrapper )
        }

        setPicture ( regim ) {
            let pictures = {
              active: "https://voxukraine.org/wp-content/uploads/2017/07/Bankomat-907x600.jpg",
              input: "https://nashkiev.ua/assets_images/post/000/100/824/image_originals.jpg",
              normal: "http://alldonetsk.info/sites/default/files/image/spravka/privattbank.jpg"
            }
            this.picture.src = pictures [ regim ]
        }
        async inputData ( promptText ) {
            this.setPicture ( "input" )
            this.message.innerText = promptText
            let elem = addElement ( 'input', bankomat.wrapper )
            let promise = new Promise ( resolve => {
                elem.onchange = function ( event ) {
                    resolve ( this.value )
                }
            })
            let answer = await promise.then ( res => res )
            elem.parentNode.removeChild ( elem )
            this.setPicture ( "normal" )
            return answer
        }
        addCash ( sum ) {
                cash += sum
        }
        async insertCard ( card ) {
            let pin = await this.inputData ( "Введите пинкод:" )
            let answer = card.cash ( pin )
            let cash = parseFloat ( answer )
            if ( !cash && cash !== 0 ) {
                this.message.innerText = answer
                this.message.style.color = "red"
                this.setPicture ( "normal" )
                return
            }
            this.message.style.color = "#7ad"
            this.setPicture ( "active" )
            this.message.innerText = "Выберите операцию:"
            let text = [
              'Посмотреть остаток счета<br>',
              'Снятие наличных<br>',
              'Пополнить карту<br>'
            ]
            let operations = []
            for ( let x = 0; x < 3; x++ ) {
                operations.push (
                  [
                    addElement ( 'input', bankomat.wrapper ),
                    addElement ( 'label', bankomat.wrapper )
                  ]
                )
            }
            operations.forEach ( ( el, index ) => {
                el[1].innerHTML = text [ index ]
                el[0].type = "radio"
                el[0].name = "operation"
                el[0].value = index
                el[0].__parent = this
                el[0].onclick = function ( event ) {
                    let selectedOperation = Number ( this.value )
                    switch ( selectedOperation ) {
                        case 0:
                          this.__parent.message.innerText = "Остаток по карте: " + cash + " ua"
                          break;
                        case 1:
                          this.__parent.inputData ( "Введите сумму:" )
                              .then ( response => {
                                  let answer = card.getMoney ( pin, response )
                                  this.__parent.message.innerText =
                                        parseFloat ( this.value ) ?
                                            ( "Получите: " + answer ) : answer
                              })
                          break;
                        case 2:
                          this.__parent.inputData ( "Сумма пополнения:" )
                            .then ( response => {
                                if ( parseFloat ( response ) )
                                    card.addCash( parseFloat ( response ) )
                            })
                          this.__parent.message.innerText = ""
                          break;
                        default:
                          break;
                    }

                    operations.forEach (
                        x => x.forEach ( y => y.parentNode.removeChild ( y ) )
                    )
                }
            })
        }
}

BankomatElement.createCard = function ( bankomat ) {
    let cardNumber = prompt ( "Введите номер карты:" )
    if ( !cardNumber ) return
    let cardPin = prompt ( "Новый пинкод:" )
    if ( !cardPin ) return
    let cardCash = 0
    return function () {
        let card = addElement ( 'img', bankomat.cardsPlace )
        card.src = "https://privatbank.ua/uploads/media/default/0001/01/c99a3c232bdc4cf2487984525969c6fe375b152d.png"
        card.className = "card"
        card.onclick = function ( event ) {
            bankomat.setPicture ( "active" )
            bankomat.insertCard ( this, cardPin, cardNumber )
        }
        card.cash = pin => pin === cardPin ? cardCash : "Access denied"
        card.getMoney = ( pin, sum ) => {
            if ( sum > cardCash ) return "Недостаточно денег на счету"
            cardCash -= sum
            return sum
        }
        card.addCash = function ( sum ) {
            if ( sum ) cardCash += sum
        }
    }
}

customElements.define ( 'bankomat-element', BankomatElement )

let bankomat = addElement ( 'bankomat-element' )

let newCard = addElement ( 'button', bankomat.wrapper )
newCard.innerText = "New card"
newCard.bankomat = bankomat
newCard.onclick = function ( event ) {
    BankomatElement.createCard ( this.bankomat ) ()
}
