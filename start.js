( () => {
     var x = location.hash.substr(1)
     var script = document.createElement ( 'script' )
     script.src = "js/index" + location.hash.substr(1) + ".js"
     document.head.appendChild ( script )
     script.onload = function ( event ) {
          console.info ( "Скрипт загружен" )
     }
     script.onerror = function ( event ) {
          console.error ( "Ошибка загрузки скрипта" )
     }
})()
