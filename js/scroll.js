const demo = document.querySelector ( '#demo' )
const main = document.querySelector ( '#main' )
const section_1 = document.querySelector ( '#section_1' )
const section_2 = document.querySelector ( '#section_2' )


function show ( event ) {

  [ "scrollTop", "scrollLeft", "scrollHeight", "offsetTop", "offsetHeight", "offsetWidth", "clientHeight", "clientWidth" ].forEach (
    item => {
      this.querySelector( `#${event.target.id}_${item}` ).innerText = event.target[item]
    }
  )
  if ( event.target.id === "main" ) {
          section_1.onscroll()
          section_2.onscroll()
  }
}

main.onscroll = show.bind ( demo.querySelector( "#main_demo" ) )
section_1.onscroll = show.bind ( demo.querySelector( "#section_1_demo" ) )
section_2.onscroll = show.bind ( demo.querySelector( "#section_2_demo" ) )

window.onresize = function ( event ) {
  main.onscroll()
  section_1.onscroll()
  section_2.onscroll()
}

document.addEventListener( "DOMContentLoaded", ready)

function ready ( event ) {
  main.dispatchEvent ( new Event ( "scroll" ))
  section_1.dispatchEvent ( new Event ( "scroll" ))
  section_2.dispatchEvent ( new Event ( "scroll" ))
}
