var GLOBAL_PATH = 'https://garevna.github.io/'
var LOCAL_PATH = 'https://garevna.github.io/js.github.io/'

document.scriptsRegistry = new GarevnaScriptsRegistry ()
document.stylesheetsRegistry = new GarevnaStylesRegistry ()
document.worker = new Worker ( LOCAL_PATH + 'js/level_2_registry_worker.js' )
document.worker.onmessage = function ( mess ) {
	if ( mess.data.type == 'script' ) {
		document.scriptsRegistry.registerScript ( {
					src: mess.data.src,
					external: true,
					functions: mess.data.functions || [],
					defer: mess.data.defer || false,
					async: mess.data.async || true,
		} )
	} else {
		document.stylesheetsRegistry.registerStyleSheet ( mess.data )
	}
}
