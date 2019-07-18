let figure1 = document.body.appendChild (
    document.createElement ( "div" )
)

let figure2 = document.body.appendChild (
    document.createElement ( "div" )
)

function randomY () {
    return Math.max ( 0, Math.round ( Math.random () * window.innerHeight - 50 ) )
}
function randomX () {
    return Math.max ( 0, Math.round ( Math.random () * window.innerWidth - 50 ) )
}

figure1.style = figure2.style = `
    position: absolute;
    width: 150px;
    height: 50px;
    left: 10px;
    font-family: Arial;
    font-size: 12px;
    color: white;
    padding: 5px 8px;
`

figure1.style.backgroundColor = "#f50"
figure1.style.top = "50px"
figure1.innerText = "setTimeout"

figure2.style.backgroundColor = "#079"
figure2.style.top = "120px"
figure2.innerText = "requestAnimationFrame"

let stop = false

document.body.onclick = () => stop = true

function handler1 () {
    !stop && setTimeout (
        function () {
            figure1.style.left = figure1.offsetLeft + 3 + "px"
            handler1 ()
        },
        49
    )
}

function handler2 () {
    figure2.style.left = figure2.offsetLeft + 1 + "px"
    !stop && requestAnimationFrame ( handler2 )
}

handler1 ()
requestAnimationFrame( handler2 )
