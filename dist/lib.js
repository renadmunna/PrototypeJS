var doc=document;
var $=document.querySelector.bind(document);
var $$=document.querySelectorAll.bind(document);
Element.prototype.$=Element.prototype.querySelector;
Element.prototype.$$=Element.prototype.querySelectorAll;
// Object
Object.proto=Object.getPrototypeOf;
// Each Loop
NodeList.prototype.each=NodeList.prototype.forEach;
Array.prototype.each=Array.prototype.forEach;
Object.prototype.each=function(fn,that){
	if(that){Object.keys(this).each(function(key){fn.call(that,this[key],key,this)},this)}
	else{Object.keys(this).each(function(key){fn(this[key],key,this)},this)}
};
HTMLCollection.prototype.each=Object.prototype.each;
// Function
Function.prototype.args=function(){var fn=this,pass=[].slice.call(arguments);
	return function(){var args=[].slice.call(arguments).concat(pass);fn.apply(this,args)};
};
// Event
EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.off = EventTarget.prototype.removeEventListener;
EventTarget.prototype.trigger = function(name,detail){
	this.dispatchEvent(new CustomEvent(name,{detail:detail}));
};
Object.listener=function(obj){
	var proto=Object.proto(obj);proto.events={};
	proto.on=function(e,fn){if(!this.events[e]){this.events[e]=[]}this.events[e].push(fn)};
	proto.trigger=function(e,data){if(!this.events[e]){return}
		this.events[e].each(function(fn){fn.call(this,data)},this);
	};
};
// delegate event
EventTarget.prototype['@on']=function(event,selector,fn){
	this.on(event,function(e,selector,fn){
		var child=e.target.closest(selector);if(child){fn.call(child,e)}
	}.args(selector,fn));
};
// Attribute
Element.prototype.attr=function(){
	if(arguments.length==1){return this.getAttribute(arguments[0])}
	if(arguments.length>1){this.setAttribute(arguments[0],arguments[1])}
};
Element.prototype['+attr']=function(attr){this.setAttribute(attr,'')};
Element.prototype['-attr']=function(attr){this.removeAttribute(attr)};
Element.prototype['?attr']=function(attr){return this.hasAttribute(attr)};
Element.prototype['!attr']=function(attr,val){
	if(this.hasAttribute(attr)){this.removeAttribute(attr)}
	else{this.setAttribute(attr,val||'')}
};
Element.prototype['@attr']=function(attr){return this.getAttribute(attr)};
Element.prototype['=attr']=function(attr){return this.getAttribute(attr)};
Element.prototype['attr=']=function(attr,val){this.setAttribute(attr,val)};
// Class
Element.prototype['+cls']=function(cls){this.classList.add(cls)};
Element.prototype['-cls']=function(cls){this.classList.remove(cls)};
Element.prototype['!cls']=function(cls){this.classList.toggle(cls)};
Element.prototype['?cls']=function(cls){return this.classList.contains(cls)};
// HTML
Element.prototype._innerHTML=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
Object.defineProperty(Element.prototype,'html',Element.prototype._innerHTML);
Object.defineProperty(Element.prototype,'+html',{
	set(html){this.insertAdjacentHTML('afterbegin',html)}
});
Object.defineProperty(Element.prototype,'html+',{
	set(html){this.insertAdjacentHTML('beforeend',html)}
});
// Parent Child
if(!Element.prototype.remove){Element.prototype.remove=function(){this.parent.removeChild(this)}}
// Node.prototype._parent=Object.getOwnPropertyDescriptor(Node.prototype,'parentElement');
Node.prototype._parent=Object.getOwnPropertyDescriptor(Node.prototype,'parentNode');
Object.defineProperty(Node.prototype,'parent',Node.prototype._parent);
Element.prototype._child=Object.getOwnPropertyDescriptor(Element.prototype,'children');
Object.defineProperty(Element.prototype,'child',Element.prototype._child);
Element.prototype._first=Object.getOwnPropertyDescriptor(Element.prototype,'firstElementChild');
Object.defineProperty(Element.prototype,'first',Element.prototype._first);
Element.prototype._last=Object.getOwnPropertyDescriptor(Element.prototype,'lastElementChild');
Object.defineProperty(Element.prototype,'last',Element.prototype._last);
Element.prototype._prev=Object.getOwnPropertyDescriptor(Element.prototype,'previousElementSibling');
Object.defineProperty(Element.prototype,'previous',Element.prototype._prev);
Object.defineProperty(Element.prototype,'prev',Element.prototype._prev);
Element.prototype._next=Object.getOwnPropertyDescriptor(Element.prototype,'nextElementSibling');
Object.defineProperty(Element.prototype,'next',Element.prototype._next);
// css
Element.prototype.css=function(prop,val){
	if(val){this.style.setProperty(prop,val)}
	else{prop.each(function(val,prop){this.style.setProperty(prop,val)},this);}
};
// Template
String.prototype.render=function(data){return this.replace(/\${(.*?)}/g,function(x,g){
	return g.split(/[\.\[\]\'\"]/g).filter(Boolean).reduce(function(obj,i){return obj[i]},data)
})};
// console
const _=console.log;