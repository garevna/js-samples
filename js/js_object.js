// JavaScript  module 1  main conseptions

	    var _obj = get_abbreviation_object ('Объект', 'Свойства Методы События', '#9f0');
		_obj.style.position = 'fixed';
		_obj.style.bottom = '50px';
		_obj.style.right = '50px';
		document.body.appendChild(_obj);
		
		var mc_elements_data = [];
		mc_elements_data [0] = {
			img:'/JavaScript/img/object.png',
			txt: 'Объект',
			_top: '30%', _left: '40%', _size:'30%',
		};
		mc_elements_data [1] = {
			img:'/JavaScript/img/properties-1.png',
			txt: 'Свойства',
			_top: '30%', _left: '20%', _size:'17%',
			_transformOrigin:"100% 100%"
		};
		mc_elements_data [2] = {
			img:'/JavaScript/img/methods-1.png',
			txt: 'Методы',
			_top: '20%', _left: '50%', _size:'20%',
			_transformOrigin:"-50% 80%"
		};
		mc_elements_data [3] = {
			img:'/JavaScript/img/event-4.png',
			txt: 'События',
			_top: '50%', _left: '50%', _size:'20%',
			_transformOrigin:"-50% 0"
		};
		var mc_elem = [];
		var mc_tween = [];
		for ( var j = 0; j < mc_elements_data.length; j++ ) {
			mc_elem[j] = document.createElement('div');
			document.getElementById("garevna_scene").appendChild(mc_elem[j]);
			mc_elem[j].style.backgroundImage = 'url(' + mc_elements_data[j].img + ')';
			mc_elem[j].txt = mc_elements_data[j].txt;
			mc_elem[j].style.position = 'absolute';
			mc_elem[j].style.top = mc_elements_data[j]._top;
			mc_elem[j].style.left = mc_elements_data[j]._left;
			mc_elem[j].style.width = mc_elements_data[j]._size;
			mc_elem[j].style.height = mc_elements_data[j]._size;
			mc_elem[j].style.backgroundSize = 'contain';
			mc_elem[j].style.backgroundRepeat = 'no-repeat';
			//mc_elem[j].onmouseover = function (event) { garevna_lib.fade_window(this.txt,'error'); };
			//mc_elem[j].onmouseout = function (event) { garevna_lib.fade_window_hide(); };
			if ( j == 0 ) {
				mc_tween[j] = TweenMax.to(mc_elem[j], 10, { scale:2.0, zIndex:500, ease:Power1.easeInOut });
			}
			else {
				mc_tween[j] = TweenMax.to(mc_elem[j], 10, {
					rotation:360,
					scale:0.5,
					opacity:0.5,
					transformOrigin:mc_elements_data[j]._transformOrigin,
					delay:0.5*j,
					ease:Power1.easeInOut
				});
			}
			mc_tween[j].eventCallback("onComplete", function () { this.reverse(0); } );
			mc_tween[j].eventCallback("onReverseComplete", function () { this.restart(); } );
			mc_tween[j].play();
		}
