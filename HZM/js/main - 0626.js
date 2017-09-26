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
}
$(function(){

	listTab();
})

function listTab(){

	var moreBtns = $('a.more');
	var opacityDivs = $('.transp');
	var closeBtns = $('.aClose');
	var buyNowDivs = $('.buyNow');

	//获取高度
	var oHs = $('.list_column_2 .productInfor');
	var oBuys = $('.list_column_2 .buyNow');
	oBuys.css({
		'height' : oHs.height(),
		'bottom' : -oHs.height()
	})

	$('a.more').click(function(){
		var index = $('a.more').index(this);
		var ulContainer = $(this).parents('ul');
		var ulClassName = $(ulContainer).attr('class');

		if(ulClassName === 'list_column_1'){
				
			init();
			opacityDivs.eq(index).show();
			mTween(opacityDivs[index], 'opacity',0.5, 1000, 'linear');
			mTween(buyNowDivs[index], 'right', 0, 1000, 'linear');
			closeBtns[index].onclick = function(){

				buyNowDivs.eq(index).css({
					'right' : '-60%',
					'height' : '100%'
				})
				
				$('.transp').hide();

			}
			}else if(ulClassName === 'list_column_2'){
				init();
				opacityDivs.eq(index).show();
				mTween(opacityDivs[index], 'opacity',0.5, 1000, 'linear');
				mTween(buyNowDivs[index], 'bottom', 0, 1000, 'linear');
				closeBtns[index].onclick = function(){

					buyNowDivs.eq(index).css({
						'right' : '0',
						'bottom': -oHs.height() + 'px',
						'height': oHs.height() + 'px'
					})

					
					$('.transp').hide();
				}
			}

	})

	
	function init(){
		$('.transp').hide();
		$('.list_column_1 .buyNow').css({
				'right' : '-60%',
				'height' : '100%'
			})
			$('.list_column_2 .buyNow').css({
				'right' : '0',
				'bottom' : -oHs.height(),
				'height' : oHs.height()
			})
	}

	$('.list_icon a').click(function(){
		var index = $('.list_icon a').index(this);
		var className = $(this).attr('class');
		var nextUl = $(this).parent().next('ul');


		if(className === 'tab1'){
			$(this).removeClass("tab1").addClass("tab2");
			$(nextUl).removeClass("list_column_1").addClass("list_column_2");
			init();
		}else{
			$(this).removeClass("tab2").addClass("tab1");
			$(nextUl).removeClass("list_column_2").addClass("list_column_1");
			init();
		}
	})


}
