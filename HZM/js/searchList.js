	//li中的内容
    var datas = [];
    //已经选中的内容
    var inputDatas = [];

    //var content = document.querySelector('.content');
    var list = document.querySelector('.searchList');
    //var addData = list.querySelector('.addData');
    var addDataText = document.querySelector('#searchInput');
    var dataLis = list.querySelectorAll('li.data');

    //数据初始化
    for ( var i=0; i<dataLis.length; i++ ) {
        datas.push(dataLis[i]);

        //点击li
       // dataLis[i].onclick = chooseData;
        dataLis[i].addEventListener("touchend",
			chooseData,
			false
		);
    }

    //点击其他的地方
    document.addEventListener("touchend",
		function(){
			//隐藏list
        	list.style.display = 'none';
		},
		false
	);

    list.addEventListener("touchend",
		function(e){
			e.stopPropagation();
		},
		false
	);

    addDataText.oninput = function(e) {
        var value = this.value;

        //遍历所有的li，如果li的内容有包含输入的内容，则显示，否则隐藏
        datas.forEach(function(v, k) {
            if ( v.innerHTML.indexOf(value) != -1 && value) {
            	v.style.display = 'block';
                list.style.display = 'block';
            } else {
                v.style.display = 'none';
                if(!value){
                	list.style.display = 'none';
                }
                
            }
        });
        
    }

    addDataText.onkeyup = function(e) {
        var value = this.value;

        if (e.which == 13 && value != '') {
            for (var i=0; i<datas.length; i++) {
                if (datas[i].innerHTML == value) {
                    //有相同的值
                    chooseData.call(datas[i]);
                    return;
                }
            }
            
        }
    }
    function chooseData() {
    	addDataText.value = this.innerHTML;
    	list.style.display = 'none';
    }

