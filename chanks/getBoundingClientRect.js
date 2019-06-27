const demo = document.querySelector ( '#demo' )
const main = document.querySelector ( '#main' )
const section_1 = document.querySelector ( '#section_1' )
const section_2 = document.querySelector ( '#section_2' )

demo.querySelectorAll("input").forEach (
  elem => {
    elem.disabled = true
    elem.onchange = function ( event ) {
        event.target.style.color = 
            parseFloat( event.target.value ) == event.param ? 
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

  [ "top", "left", "bottom", "right", "height", "width", "x", "y" ].forEach (
      item => sendValueToElement (
            this.querySelector( `#${event.target.id}_${item}` ),
            event.target.getBoundingClientRect()[item]
      )
    )
}

main.onscroll = show.bind ( demo.querySelector( "#main_demo" ) )
section_1.onscroll = show.bind ( demo.querySelector( "#section_1_demo" ) )
section_2.onscroll = show.bind ( demo.querySelector( "#section_2_demo" ) )

window.onresize = function ( event ) {
  main.dispatchEvent ( new Event ( "scroll" ))
  section_1.dispatchEvent ( new Event ( "scroll" ))
  section_2.dispatchEvent ( new Event ( "scroll" ))
}

document.addEventListener( "DOMContentLoaded", ready)

function ready ( event ) {
  main.dispatchEvent ( new Event ( "scroll" ))
  section_1.dispatchEvent ( new Event ( "scroll" ))
  section_2.dispatchEvent ( new Event ( "scroll" ))
  reset()
}

function reset ( event ) {
  demo.querySelectorAll("input").forEach (
    elem => elem.style.color = "#079"
  )
}
