var hello = document.createElement ( 'div' )
hello.style = `position: fixed; 
                top: 15%; left: 15%; 
                bottom: 15%; right: 15%; 
                box-shadow: 10px 10px 16px #00000090; 
                border: solid 0.5px #bbb; 
                padding: 30px;`
document.body.appendChild ( hello )
hello.innerHTML = "<h3>Success!</h3>"
hello.innerHTML += "<p>file integrity test resuts with OK</p>"
setTimeout ( () => {
        document.body.removeChild ( hello )
}, 4000 )
