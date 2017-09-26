(function(){
	//倒计时
	var oTime = document.querySelector(".preOrderTime");
	var oTimeframes = document.querySelectorAll('.countDown aside');
	var oTimelists = document.querySelectorAll('.countDown span');
	countDown();
	setInterval(countDown,500);
	function countDown(){
		var currentDate = new Date();
		var targetDate = new Date(2016,7,12,10,5,0);//注意：这里的月份：实际月份减1
		var v = targetDate - currentDate;
		var d = parseInt(v/(3600000 * 24));
		var h = parseInt(v%(3600000 * 24)/3600000);
		var m = parseInt(v%(3600000 * 24)%3600000/60000);
		var s = parseInt(v%(3600000 * 24)%3600000%60000/1000);
		if(d<0){oTimeframes[0].style.display = 'none'}
		if(h<0){oTimeframes[1].style.display = 'none'}
		if(m<0){oTimeframes[2].style.display = 'none'}
		if(s<0){oTime.style.display = 'none'}
		oTimelists[0].innerHTML = d;
		oTimelists[1].innerHTML = h;
		oTimelists[2].innerHTML = m;
		oTimelists[3].innerHTML = s;
	}
	//productList排版切换
	var oIcon = document.querySelector('.list_icon');
	oIcon.addEventListener("touchend",
		function(){
			if(oList.className == 'list_column_1'){
				oList.className = 'list_column_2';
				oIcon.style.backgroundPosition = '-0.925rem 0';
				//获取高度
				var oHs = document.querySelectorAll('.list_column_2 .productInfor');
				var oBuys = document.querySelectorAll('.list_column_2 .buyNow');
				for(var i=0;i<oHs.length;i++){
					h = fHeight(oHs[i]) + 10;
					oBuys[i].style.height = h +'px';
					oBuys[i].style.bottom = -h + 'px';
					// console.log(h);
				};
				bottomDiv();
			}else if(oList.className == 'list_column_2'){
				oList.className = 'list_column_1';
				oIcon.style.backgroundPosition = '0 0';
				rightDiv();

			}
		},
		false);

	//productList里点击更多出来效果
	var oList = document.querySelector('#productList ul');
	var oMore = document.querySelectorAll('a.more');
	var oBuynow = document.querySelectorAll('.buyNow');
	var otransps = document.querySelectorAll('.transp');
	var oCloses = document.querySelectorAll('.aClose');
	var h;
	var durTime = 500;
	
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
					oBuynow[this.index].style.right = '-50%';
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

	function fHeight(obj){
			return obj.offsetHeight;
		}

		function rightDiv(){
			for(var i=0;i<oMore.length;i++){
				otransps[i].style.display ='none';
				oBuynow[i].style.right = '-50%';
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
				mTween(otransps[n], 'opacity',0.5, durTime, 'linear');
				mTween(oBuynow[n], 'right', 0, durTime, 'linear');
			}else if(oList.className == 'list_column_2'){
				bottomDiv();
				otransps[n].style.display ='block';
				mTween(otransps[n], 'opacity',0.5, durTime, 'linear');
				mTween(oBuynow[n], 'bottom', 0, durTime, 'linear');
			}
		}
}())
	

