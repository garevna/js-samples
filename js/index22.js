const elems = [
    {
        size: Math.round ( Math.random() * 200 ),
        backColor: "red"
    },
    {
        size: Math.round ( Math.random() * 200 ),
        backColor: "orange"
    },
    {
        size: Math.round ( Math.random() * 200 ),
        backColor: "yellow"
    },
    {
        size: Math.round ( Math.random() * 200 ),
        backColor: "green"
    },
    {
        size: Math.round ( Math.random() * 200 ),
        backColor: "blue"
    }
]

elems.iterator = (
    async function* () {
        const addElem = ( size, color ) => {
            let elem = document.body.appendChild (
                document.createElement ( "circle-element" )
            )
            elem.size = size
            elem.backColor = color

            return elem
        }
        const promise = ( size, color ) =>
            new Promise (
                resolve =>
                    setTimeout (
                        () => resolve ( addElem ( size, color ) ),
                        1000
                    )
            )
        let len = this.length
        while ( len --> 0 ) {
            let elem = await promise ( this[len].size, this[len].backColor )
            customElements.whenDefined( 'circle-element' )
                .then (
                    () => elem.setStyle ()
                )
            yield elem
        }
    }
).call ( elems )


async function iterateElements () {
    for ( var item of elems )
        await elems.iterator.next()
}

iterateElements ()


class CircleElement extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow ( { mode: 'open' } )
        this.shadow.appendChild (
            document.createElement ( "div" )
        )
    }
    setStyle () {
        this.shadow.appendChild (
            ( () => {
                let style = document.createElement ( "style" )
                style.appendChild (
                    ( () => {
                        let css = document.createTextNode(
                          `
                              div {
                                  width: ${this.size}px;
                                  height: ${this.size}px;
                                  border: inset 1px;
                                  border-radius: 50%;
                                  box-shadow: 3px 3px 5px #00000090;
                                  background-color: ${this.backColor};
                              }
                              div:hover {
                                  box-shadow: inset 3px 3px 5px #00000090;
                              }
                          `
                        )
                        return css
                    })()
                )
                return style
            })()
        )
    }
}

customElements.define ( "circle-element", CircleElement )
