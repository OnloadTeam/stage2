	/*
	* 兼容各种浏览器的事件绑定
	* param obj 传进来的对象 
	* param tp 类型如click
	* param fn 处理函数
	 */
	/*function addEvent(obj,tp,fn){
		//判断浏览器
		if(obj.addEventListener){
			obj.addEventListener(tp,fn,false);
		}else if(obj.attachEvent){
			obj.attachEvent('on'+tp,fn);
		}else{
			obj['on'+tp] = fn;
		}
	}*/
	function addEvent(element, type, handler) {
    if(element.addEventListener) {
        addEvent = function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addEvent = function(element, type, handler) {
            element.attachEvent("on"+type, handler);
        };
    } else {
        addEvent = function(element, type, handler) {
            element["on"+type] = handler;
        };
    }
    return addEvent(element, type, handler);
};