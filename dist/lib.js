var doc=document;
var dom=document.querySelector.bind(document);
var doms=document.querySelectorAll.bind(document);
HTMLElement.prototype.dom=HTMLElement.prototype.querySelector;
HTMLElement.prototype.doms=HTMLElement.prototype.querySelectorAll;
EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.trigger = EventTarget.prototype.dispatchEvent;
HTMLElement.prototype.hasAttr=HTMLElement.prototype.hasAttribute;
HTMLElement.prototype._setAttribute=HTMLElement.prototype.setAttribute;
HTMLElement.prototype.setAttribute=function(name,value){
	var oldValue=this.getAttribute(name);
	this._setAttribute(name,value);
	this.dispatchEvent(new CustomEvent('attrChange',{detail:{
		name:name,value:value,oldValue:oldValue
	}}));
};
HTMLElement.prototype.attr=function(){
return arguments.length==1 && this.getAttribute(arguments[0])
	|| arguments.length==2 && this.setAttribute(arguments[0],arguments[1]);
};
function forEach(obj,func){Array.prototype.forEach.call(obj,func)}
NodeList.prototype.each=NodeList.prototype.forEach;
Array.prototype.each=Array.prototype.forEach;
Object.prototype.each=function(func){obj=this;
	for(const key in obj){if(obj.hasOwnProperty(key)&&func){func(obj[key],key,obj)}}
};
String.prototype.render=function(data){return this.replace(/\${(.*?)}/g,function(x,g){
	return g.split(/[\.\[\]\'\"]/g).filter(Boolean).reduce(function(obj,i){return obj[i]},data)
})};