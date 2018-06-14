var sample = document.querySelector ( 'input' )

function testElemContent () {
        return sample.value.split("document").join("")
}
sample.onchange =  function () {
        document.write ( testElemContent() )
}


// <IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>
// <BODY BACKGROUND="javascript:alert('XSS')">
