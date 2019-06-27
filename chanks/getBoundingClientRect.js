const demo = document.querySelector ( '#demo' )
const main_demo = document.querySelector ( '#main_demo' )
const section_1_demo = document.querySelector ( '#section_1_demo' )
const section_2_demo = document.querySelector ( '#section_2_demo' )

const main = document.querySelector ( '#main' )
const section_1 = document.querySelector ( '#section_1' )
const section_2 = document.querySelector ( '#section_2' )

demo.querySelectorAll("input").forEach (
  inputElem => {
    inputElem.disabled = true
    inputElem.onchange = function ( event ) {
        event.target.style.color = 
            parseFloat( event.target.value ) == event.param.toFixed(2) ? 
                "#079" : "#f00"
        event.target.value = event.param.toFixed(2)
    }
  }
)


function show ( event ) {
  function sendValueToElement ( elem, val ) {
      let event = new Event ( "change" )
      event.param = val
      elem.dispatchEvent ( event )
  }
  const rect = event.target.getBoundingClientRect()

  for ( let propName in rect ) {
    let elem = this.querySelector( `#${event.target.id}_${propName}` )
      elem && elem.nodeType === 1 ? sendValueToElement (
          this.querySelector( `#${event.target.id}_${propName}` ),
          rect[propName]
      ) : null
  }
}

main.onscroll = function ( event ) {
  reset( main )
  show.call( main_demo, event )
  reset( section_1_demo )
  section_1.dispatchEvent ( new Event ( "scroll" ))
  reset( section_2_demo )
  section_2.dispatchEvent ( new Event ( "scroll" ))
}

section_1.onscroll = show.bind ( section_1_demo )
section_2.onscroll = show.bind ( section_2_demo )

window.onresize = function ( event ) {
  reset( main )
  reset( section_1 )
  reset( section_2 )
  main.dispatchEvent ( new Event ( "scroll" ))
}

document.addEventListener( "DOMContentLoaded", ready)

function sendScrollEvent () {
    main.dispatchEvent ( new Event ( "scroll" ))
    section_1.dispatchEvent ( new Event ( "scroll" ))
    section_2.dispatchEvent ( new Event ( "scroll" ))
}

function ready ( event ) {
  sendScrollEvent ()
  reset( main )
  reset( section_1 )
  reset( section_2 )
}

function reset ( element ) {
  element.querySelectorAll("input").forEach (
    elem => elem.style.color = "#079"
  )
}
