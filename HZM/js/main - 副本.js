window.onload = function(){
	toSize();
	function toSize(){
		var oHtml = document.querySelector("html");
		var iW= oHtml.getBoundingClientRect().width;//oHtml.clientWidth;
		oHtml.style.fontSize=iW/16+"px";
	}
	window.addEventListener("resize",
		function(){
			toSize();
		},
		false
	);
	window.addEventListener("orientationchange",
		function(){
			toSize();
		},
		false
	);
	//头部切换
	var oIcon = document.querySelector('.list_icon');
	var oList = document.querySelector('.list ul');
	var oMore = document.querySelectorAll('a.more');
	var oBuynow = document.querySelectorAll('.buyNow');
	var otransps = document.querySelectorAll('.transp');
	var oCloses = document.querySelectorAll('.aClose');
	var h;

	//获取高度
	var oHs = document.querySelectorAll('.list_column_2 .productInfor');
	var oBuys = document.querySelectorAll('.list_column_2 .buyNow');
	for(var i=0;i<oHs.length;i++){
		h = fHeight(oHs[i]);
		oBuys[i].style.height = h +'px';
		oBuys[i].style.bottom = -h + 'px';
	};
	
	for(var i=0;i<oMore.length;i++){
		oMore[i].index = i;
		oCloses[i].index = i;
		//开启
		oMore[i].addEventListener("touchend",
			function(){
				animationFunOpen(this.index);
			},
			false
			);
		//关闭
		oCloses[i].addEventListener("touchend",
			function(){
				if(oList.className == 'list_column_1'){
					otransps[this.index].style.display ='none';
					oBuynow[this.index].style.right = '-60%';
					oBuynow[this.index].style.height = '100%';
				}else if(oList.className == 'list_column_2'){
					oBuynow[this.index].style.right = '0';
					otransps[this.index].style.display ='none';
					oBuynow[this.index].style.bottom = -h + 'px';
				}
			},
			false
			);
	}

	oIcon.addEventListener("touchend",
		function(){
			if(oList.className == 'list_column_1'){
				oList.className = 'list_column_2';
				oIcon.style.backgroundPosition = '-0.925rem 0';
				//获取高度
				var oHs = document.querySelectorAll('.list_column_2 .productInfor');
				var oBuys = document.querySelectorAll('.list_column_2 .buyNow');
				for(var i=0;i<oHs.length;i++){
					h = fHeight(oHs[i]);
					oBuys[i].style.height = h +'px';
					oBuys[i].style.bottom = -h + 'px';
				};
				bottomDiv();
			}else if(oList.className == 'list_column_2'){
				oList.className = 'list_column_1';
				oIcon.style.backgroundPosition = '0 0';
				rightDiv();

			}
		},
		false);

		function fHeight(obj){
			return obj.offsetHeight;
		}

		function rightDiv(){
		for(var i=0;i<oMore.length;i++){
			otransps[i].style.display ='none';
			oBuynow[i].style.right = '-60%';
			oBuynow[i].style.height = '100%';
			}
		}
		function bottomDiv(){
			for(var i=0;i<oMore.length;i++){
				oBuynow[i].style.right = '0';
				otransps[i].style.display ='none';
				oBuynow[i].style.bottom = -h + 'px';
			}
		}
		function animationFunOpen(n){
			if(oList.className == 'list_column_1'){
				rightDiv();
				otransps[n].style.display ='block';
				mTween(otransps[n], 'opacity',0.5, 1000, 'linear');
				mTween(oBuynow[n], 'right', 0, 1000, 'linear');
			}else if(oList.className == 'list_column_2'){
				bottomDiv();
				otransps[n].style.display ='block';
				mTween(otransps[n], 'opacity',0.5, 1000, 'linear');
				mTween(oBuynow[n], 'bottom', 0, 1000, 'linear');
			}
				
				
			}

}