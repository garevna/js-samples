document.getElementsByTagName ( "input" )[0].remove()

const getRandomRadius = () =>
    Math.max ( 30, Math.round ( Math.random() * 200 ) )

const elems = [
    {
        size: getRandomRadius(),
        backColor: "red"
    },
    {
        size: getRandomRadius(),
        backColor: "orange"
    },
    {
        size: getRandomRadius(),
        backColor: "yellow"
    },
    {
        size: getRandomRadius(),
        backColor: "green"
    },
    {
        size: getRandomRadius(),
        backColor: "blue"
    }
]

elems.iterator = (
    async function* () {
        const addElem = ( size, color ) => {
            let elem = document.body.appendChild (
                document.createElement ( "circle-element" )
            )
            elem.setAttribute ( "size", size )
            elem.setAttribute ( "color", color )

            return elem
        }
        const promise = ( size, color ) =>
            new Promise (
                resolve =>
                    setTimeout (
                        () => resolve ( addElem ( size, color ) ),
                        Math.round ( 5000 - Math.random () * 4000 )
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
        this.shadowStyle = document.createElement ( "style" )
        this.shadow.appendChild ( this.shadowStyle )
        this.shadowStyle.textContent = ''
    }
    static get observedAttributes() {
        return [ 'size', 'color']
    }
    attributeChangedCallback( attrName, oldVal, newVal ) {
        this.setStyle ()
    }
    setStyle () {
        this.shadowStyle.textContent = `
             div {
                 width: ${ this.getAttribute ( "size" ) }px;
                 height: ${ this.getAttribute ( "size" ) }px;
                 border: inset 1px;
                 border-radius: 50%;
                 box-shadow: 3px 3px 5px #00000090;
                 background-color: ${ this.getAttribute ( "color" ) };
            }
            div:hover {
                box-shadow: inset 3px 3px 5px #00000090;
            }
        `
    }
}

customElements.define ( "circle-element", CircleElement )
