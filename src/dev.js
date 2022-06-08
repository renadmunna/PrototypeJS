Function.prototype.test=function(name,loop){
	console.time(name);for(var i=0;i<loop;i++){this()}console.timeEnd(name);
};

const test=function(name,loop,fn){
	console.time(name);for(var i=0;i<loop;i++){fn()}console.timeEnd(name);
};