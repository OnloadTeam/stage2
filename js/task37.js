function initOpen() {
	$("container").addEventListener('click',function(e) {
		if((e.target||e.srcElement)&&e.target.nodeName.toLowerCase()==="button"&&e.target.className === "btn") {
			$("popup").style.display = "flex";
		}
	},false);
}
function initClose() {
	$("popup").addEventListener('click',function(e) {
		console.log(e.target,e.target.className||e.target.id)
		if((e.target||e.srcElement)&&(e.target.nodeName.toLowerCase()==="button"||e.target.nodeName.toLowerCase()==="span")) {
			$("popup").style.display = "none";
		}
	},false);
	$("popup").addEventListener('click',function(e) {
		if(e.target.id ==="popup") {
			$("popup").style.display = "none";
		}
	},false);
}
function $(id) {
    return document.getElementById(id);
}
window.onload = function() {
	initOpen();
	initClose();
}