function mySlider(obj,oicon){
		var ul = document.querySelector(obj);
		var navBtns = document.querySelectorAll(oicon);
		var len = navBtns.length;
		var start = 0;
		var index = 0;//显示元素的索引
		var screenW,
			allWidth,
			startTouch,
			slideDistance;//滑动距离

		css(ul, "translateX", start);
		cssReset();
		function cssReset(){
			screenW = ul.children[0].offsetWidth;
			allWidth = len * screenW;
			css(ul, "width",allWidth);
		}
		window.addEventListener("resize",
			function(){
				cssReset();
				css(ul,"translateX",-index*screenW);
			},
			false
		);
		ul.addEventListener("touchstart",
			function(e){
				startTouch = e.changedTouches[0].pageX;
				start = css(ul, "translateX");;
			},
			false
			);
		ul.addEventListener("touchmove",
			function(e){
				var nowTouch = e.changedTouches[0].pageX;
				slideDistance = nowTouch - startTouch;
				css(ul, "translateX",slideDistance+start);
			},
			false
			);
		ul.addEventListener("touchend",
			function(){
				//slideDistance<0 表示向左滑
				if(slideDistance < 0){
					index = index + 1;
				}else{
				//表示向右滑
				index = index - 1;
				}
				index = index < 0 ? 0 : index;
				index = index >= navBtns.length-1 ? navBtns.length - 1 : index;
				ul.style.transition = '0.5s';
				css(ul,"translateX",-index*screenW);
				for(var i = 0;i<navBtns.length;i++){
					navBtns[i].className = '';
				}
				navBtns[index].className = 'active';
			},
			false
			);
}