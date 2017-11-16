//  Scripts and Styles needed for level_2.html

var GLOBAL_PATH = 'https://garevna.github.io/'
var LOCAL_PATH = 'https://garevna.github.io/js.github.io/'

var styleSheets = [
	LOCAL_PATH  + "css/main.css",			/* Общие стили */
	LOCAL_PATH  + "css/work-panel.css",		/* work panel */
	LOCAL_PATH  + "css/buttons.css",		/* Стили кнопок */
	LOCAL_PATH  + "css/news.css",			/* Лента новостей */
	GLOBAL_PATH + "css/modals.css"			/* Модальные окна */
];
var scripts = [
	//{
	//	src: LOCAL_PATH + '/js/login.js',
	//	functions: [ "garevnaLoginProcess", "garevnaLogin" ]
	//},
	{
		src: LOCAL_PATH + "js/garevna_media_library.js",													/* old library */
		functions: [
			"create_event",
			"createStyleSheet",
			"addCSSRuleToStyleSheet",
			"removeCSSAttributeFromCSSRule",
			"appendCSSAttributeToCSSRule",
			"removeCSSRuleFromStyleSheet",
			"removeStyleSheetById",
			"loadSource",
			"fade_window",
			"ElemTooltip",
			"build_swf",
			"createPanel",
			"get_win_size",
			"speakAboutNode",
			"createPromptWin",
			"create_home_button",
			"getNaviFontSize",
			"getParentObjectSize",
			"createNaviButton",
			"init_spin",
			"createFlash",
			"addStars",
			"news_callback",
			"add_event_listener",
			"remove_event_listener"
		]
	},
	{
	  src: LOCAL_PATH + "js/work_panel.js",															/* work panel */
		functions: [
			"garevna_WorkPanel.getStructure",
			"garevna_WorkPanel.createDomElements",
			"garevna_WorkPanel.createPanel",
			"garevna_WorkPanel.createPanelTop",
			"garevna_WorkPanel.createPanelContent",
			"garevna_WorkPanel.createFolderElement",
			"garevna_WorkPanel.addFolderContent",
			"garevna_WorkPanel.folderForms",
			"garevna_WorkPanel.folderStates",
			"garevna_WorkPanel.getButtonType"
		]
	},
	{
	  src: LOCAL_PATH + "js/level_2.js",															/* work panel */
		defer: true,
		functions: [
			"SceneForStudyProcessConstructor"
		]
	}
];
var externalScripts = [
	{
		src: GLOBAL_PATH + "libs/modals.js",	/* Модальные окна */
		functions: [ "Modals" ]
	},
	{
		src: GLOBAL_PATH + "libs/get_abbreviation_object.js",
		functions: [ "get_abbreviation_object" ]
	},
	{
		src: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSaUV1ZDJvZ0hsMlE",	/* formatting_text */
		functions: [ "garevna_js_content.coloringText", "garevna_js_content.coloringTags" ]
	},
	{
		src: "https://www.youtube.com/iframe_api",											/* YouTube API */
		functions: []
	},
	{
		src: GLOBAL_PATH + "GSAP/TweenMax.min.js",	/* GreenSock */
		functions: []
	},
	{
		src: GLOBAL_PATH + "GSAP/CSSPlugin.min.js",	/* GreenSock */
		functions: []
	},
	{
		src: GLOBAL_PATH + "GSAP/EasePack.min.js",	/* GreenSock */
		functions: []
	}
];
for ( var i = 0; i < styleSheets.length; i++ ) {
	this.postMessage ( { type: "style", src: styleSheets [i] } )
}
for ( var j = 0; j < externalScripts.length; j++ ) {
	this.postMessage ( { type: "script", external: true, src: externalScripts [j].src  } )
}
for ( var j = 0; j < scripts.length; j++ ) {
	this.postMessage ( { type: "script", external: false, src: scripts [j].src } )
}
