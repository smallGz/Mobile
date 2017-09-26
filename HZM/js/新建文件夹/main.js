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
	var flag = false;
	var oHeight;

	//获取高度
	init();

	$('a.more').click(function(){

		if(flag) return;
		flag=true;

		var index = $('a.more').index(this);
		var ulContainer = $(this).parents('ul');
		var ulClassName = $(ulContainer).attr('class');

		init();
		opacityDivs.eq(index).show();
		opacityDivs.eq(index).animate({'opacity' : 0.5},1000,function(){flag = false});

		if(ulClassName === 'list_column_1'){

			buyNowDivs.eq(index).animate({'right' : 0},1000,function(){flag = false});

			closeBtns[index].onclick = function(){

				buyNowDivs.eq(index).css({
					'right' : '-60%',
					'height' : '100%'
				})
				
				$('.transp').hide();

			}
			}else if(ulClassName === 'list_column_2'){
				
				buyNowDivs.eq(index).animate({'bottom': 0},1000,function(){flag = false});

				closeBtns[index].onclick = function(){

					buyNowDivs.eq(index).css({
						'right' : '0',
						'bottom': -oHeight + 'px',
						'height': oHeight + 'px'
					})

					
					$('.transp').hide();
				}
			}
			
			
	

	})
	function init(){
		//获取高度
	var oHs = $('.list_column_2 .productInfor');
	var oBuys = $('.list_column_2 .buyNow');
	oHeight = oHs.height();
	oBuys.css({
		'height' : oHs.height(),
		'bottom' : -oHs.height()
	})
		//初始化
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