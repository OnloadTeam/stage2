var oDiv = document.getElementById('div'),
	oTxt = document.getElementById('txt'),
	boxDiv = document.getElementById('red-div');
//建立红色数字块
function creatDiv(){
	var box = document.createElement('div');
	box.className = "red-box";
	box.innerHTML = oTxt.value;
	return box;
}
//左插入
function creatBoxL(){
	boxDiv.appendChild(creatDiv());
}
//右插入
function creatBoxR(){
	boxDiv.insertBefore(creatDiv(),boxDiv.children[0]);
}
//左侧出
function delBoxL(){
	alert(boxDiv.children[0].innerHTML);
	boxDiv.removeChild(boxDiv.children[0]);
}
//右侧出
function delBoxR(){
	alert(boxDiv.lastChild.innerHTML);
	boxDiv.removeChild(boxDiv.lastChild);
}
function delBoxHandle(target){
	boxDiv.removeChild(target);
}
//主函数
function init(){	
	var	oBtn = oDiv.getElementsByTagName('button');
	oBtn[0].addEventListener('click',creatBoxL);
	oBtn[1].addEventListener('click',creatBoxR);
	oBtn[2].addEventListener('click',delBoxL);
	oBtn[3].addEventListener('click',delBoxR);
	boxDiv.addEventListener('click',function(e){
		if(e.target && e.target.nodeName === 'DIV'){
			delBoxHandle(e.target);
		}
	});
}
init();