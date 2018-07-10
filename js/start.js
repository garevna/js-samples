( () => {
     var x = location.hash.substr(1)
     var script = document.createElement ( 'script' )
     script.src = "js/index" + location.hash.slice(1) + ".js"
     document.head.appendChild ( script )
     script.onload = function ( event ) {
          var theScript = document.querySelector ( "script[src='js/start.js']")
          theScript.parentNode.removeChild ( theScript )
     }
     script.onerror = function ( event ) {
          console.error ( "Ошибка загрузки скрипта" + script.src )
     }
     document.addEventListener( "DOMContentLoaded", function( event ) {
       var mouseTailScript = document.createElement ( 'script' )
       mouseTailScript.src = "https://drive.google.com/uc?export=download&id=1q11NO8gi3kdxUxmT7m5HSmc-_07fGh8M"
       document.head.appendChild ( mouseTailScript )
       mouseTailScript.onload = event =>
            setTimeout ( () =>
                    document.head.removeChild ( mouseTailScript ), 500 )
     })
})()
