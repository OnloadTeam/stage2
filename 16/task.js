window.onload=function(){

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
	var city     = document.getElementById('aqi-city-input'),
	    airQua   = document.getElementById('aqi-value-input'),
	    cityList = document.getElementById('aqi-table'),
	    addBtn   = document.getElementById('add-btn'),
	    cityError= document.getElementById('cityError'),
	    eqaCity  = document.getElementById('eqaCity');
	var flag  = true; 
	city.onblur    = checkCityError;
	airQua.onblur  = checkQuaError;
function checkCityError(){
	var matCity = /^[\u4E00-\u9FA5\uF900-\uFA2D A-Za-z]+$/;
	if(city.value.match(matCity) == null){
		cityError.innerHTML = "<font color='red'>天气只能是中英文字符</font>";
		return false;
	}else{
		cityError.innerHTML =' ';
		return city.value;
	}
}
function checkQuaError(){
	var matQua = /^(100|[1-9][0-9]{0,1})$/;
	if( airQua.value.match(matQua) == null){
		eqaCity.innerHTML = "<font color='red'>空气质量只能小于100的正数哟</font>";
		return false;
	}else{
		eqaCity.innerHTML =' ';
		return airQua.value;
	}
}
function addAqiData(addCity,addAirQua) {
	if(flag){
		var trNode   = document.createElement('tr'); 
		trNode.innerHTML = "<td>"+ '城市' +"</td><td>"+'空气质量'+"</td><td>操作</td>";
		cityList.appendChild(trNode);
		flag = false;
	}
	var trNode   = document.createElement('tr'); 
	trNode.innerHTML = "<td width='100px'>"+ addCity +"</td><td width='50px'>"+addAirQua+"</td><td width='50px'><button>删除</button></td>";
	cityList.appendChild(trNode);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	//alert(2);
	// trNode.innerHTML = "<td>"+ '城市' +"</td><td>"+'空气质量'+"</td>操作</td>";
	// cityList.appendChild(trNode);	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {

	aqiData.city   = checkCityError();
    aqiData.airQua = checkQuaError();
    if(aqiData.city == false || aqiData.airQua == false){
    	window.alert('请看提示内容重新输入');
    	return false;
    }else{
    	addAqiData(aqiData.city,aqiData.airQua);
    }
	
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  if(e.target && e.target.nodeName.toUpperCase() == 'BUTTON'){
  	var btnPar = e.target.parentNode.parentNode;
  	cityList.removeChild(btnPar);
  }
  //renderAqiList();
}
/*
* 兼容各种浏览器的事件绑定
* param tp 类型如click
* param fn 处理函数
* param obj 传进来的对象
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
/*
* 兼容各种浏览器的事件接触
* param tp 类型如click
* param fn 处理函数
* param obj 传进来的对象
 */
function removeEvent(obj,tp,fn){}
function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 // addEvent(addBtn,'click',addBtnHandle);
 addBtn.addEventListener('click',addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  addEvent(cityList,'click',delBtnHandle);
}

init();



}