var sample = {
        elem: document.querySelector ( 'input' ),
        getElemContent: () => this.elem.value,
        testElemContent: () => 
            this.elem.value.split("document").join(""),
        showElemContent: () => {
                document.write ( testElemContent () )
        }
}
