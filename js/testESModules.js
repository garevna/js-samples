export function showMessage ( message ) {
    var demo = document.createElement ( 'div' )
    demo.style = `position: fixed;
                    top: 15%; left: 15%;
                    bottom: 15%; right: 15%;
                    box-shadow: 10px 10px 16px #00000090;
                    border: solid 0.5px #bbb;
                    padding: 30px;
                    z-index: 300;
                    background-color: #000;`
    document.body.appendChild ( demo )
    demo.innerHTML = `
        <h2 style='color: #789'>Module was successfully imported</h2>
        <p style='color: #fa0'>Now you can see how it works :)</p>
        <hr>
        <h3 style='color: #dde'>${message}</h3>
    `
    setTimeout ( () => {
            document.body.removeChild ( demo )
    }, 10000 )
}
