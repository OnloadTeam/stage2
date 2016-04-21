function $(ele){
	return document.getElementById(ele);
}

window.onload=function(){
	var tagText        =  $('tagText'),
		tagList        =  $('tagList'),
		interestText   =  $('interestText'),
		interestBtn    =  $('interestBtn'),
		interestList   =  $('interestList');
	/*
	* 兼容各种浏览器的事件绑定
	* param obj 传进来的对象 
	* param tp 类型如click
	* param fn 处理函数
	 */
	function addEvent(obj,tp,fn){
		//判断浏览器
		if(obj.addEventListener){
			obj.addEventListener(tp,fn,false);
		}else if(obj.attachEvent){
			obj.attachEvent('on'+tp,fn);
		}else{
			obj['on'+tp] = fn;
		}
	}
	function conDel(e){
		e.target.parentNode.removeChild(e.target)
	}
	function delDiv(e){
		if(e.target && e.target.nodeName.toUpperCase() == 'SPAN'){
			// alert(e.target.innerHTML);
			tempValue = e.target.innerText;
			e.target.style.background  = 'pink';
			e.target.innerText         =  '点击删除'+e.target.innerText;
			addEvent(e.target,'click',conDel);
		}
	}
	function notDel(e){
		if(e.target && e.target.nodeName.toUpperCase() == 'SPAN'){
			e.target.style.background  = 'green';
			e.target.innerText         =  tempValue;
		}
	}
	addEvent(tagList,'mouseover',delDiv);
	addEvent(tagList,'mouseout',notDel);
	function addThing(){};
	addThing.prototype.pushInterset = pushInterset;
	function pushInterset(){
		var sign= false;
		var msg = /[\w\d\u4E00-\u9FA5\uF900-\uFA2D]+/g;
		var inputValue = interestText.value.match(msg);   //把内容要求变为数组的形式
		var tagLen     = inputValue.length;
		for(var i=0;i<tagLen;i++){
			sign           = false;
			var divList    = interestList.getElementsByTagName('div'),
				divListLen = divList.length;
			for(var j=0;j<divListLen;j++){
				if(divList[j].innerHTML  == inputValue[i]){
					sign = true;
				}
			}
			if(sign == true){
				continue;
			}
			var spanNode   = document.createElement('div');
			spanNode.style.display = "inline-block";
			spanNode.textContent =inputValue[i];
			if(interestList.firstElementChild == null){
				interestList.appendChild(spanNode);
			}else{
				interestList.insertBefore(spanNode,interestList.firstElementChild);
			}
			if(interestList.childElementCount >10){
				for(var j=0;j<interestList.childElementCount-10;j++){
					console.log(interestList.childElementCount);
					interestList.removeChild(interestList.lastElementChild);
				}
			}
		}
	}

	var add    = new addThing();    //实例化一个addthing
	interestBtn.onclick=function(){
		add.pushInterset();
	}
}