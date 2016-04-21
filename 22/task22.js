//window.onload=function(){
"use strict";

	var tree={
		root   :document.querySelector('.box'),
		btn    :document.getElementsByTagName('button'),
		preBtn :document.getElementsByTagName('button')[0],
		midBtn :document.getElementsByTagName('button')[1],
		nextBtn:document.getElementsByTagName('button')[2]
	}
	var treeWalker   = new walkTree();

	addEvent(tree.preBtn,'click',function(){
		treeWalker.stack = [];
		treeWalker.preWalk(tree.root);
		treeWalker.animated();
	});
	addEvent(tree.midBtn,'click',function(){
		treeWalker.stack = [];
		treeWalker.midWalk(tree.root);
		treeWalker.animated();
	});
	addEvent(tree.nextBtn,'click',function(){
		treeWalker.stack = [];
		treeWalker.nextWalk(tree.root);
		treeWalker.animated();
	})
	function walkTree(){
		this.stack = [];
		this.warking = true;
	}
	walkTree.prototype.preWalk  =function(data){
		if(data){
			this.stack.push(data);
			this.preWalk(data.firstElementChild);
			this.preWalk(data.lastElementChild);
		}
	}
	walkTree.prototype.midWalk  =function(data){
		if(data){
			this.midWalk(data.firstElementChild);
			this.stack.push(data);
			this.midWalk(data.lastElementChild);
		}
	}
	walkTree.prototype.nextWalk =function(data){
		if(data){
			this.nextWalk(data.firstElementChild);
			this.nextWalk(data.lastElementChild);
			this.stack.push(data);
		}
	}
	walkTree.prototype.animated =function(){

		var that  = this,
			count = 0,
			timer;
		if(that.warking){
			that.warking = false;
			timer = setInterval(function(){
				if(count == that.stack.length-1){
					that.warking = true;
					that.stack[count].style.backgroundColor = '#FFF';
					clearInterval(timer);
				}else{
					++count;
					that.stack[count-1].style.backgroundColor = '#FFF'; 
					that.stack[count].style.backgroundColor = 'red';
				}
			},1000)
		}
	}

//}