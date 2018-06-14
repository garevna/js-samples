var sample = {
        elem: document.querySelector ( 'input' ),
        getElemContent: () => this.elem.value,
        testElemContent: () => 
            this.elem.value.split("document").join(""),
        showElemContent: () => {
                document.write ( testElemContent () )
        }
}

sample.elem.onchange = function ( event ) {
        sample.showElemContent ()
}

// <IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>
// <BODY BACKGROUND="javascript:alert('XSS')">
