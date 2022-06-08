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
Function.prototype.args=function(){that=this;pass=[].slice.call(arguments);
	return function(e){args=[e].concat(pass);that.apply(this,args)};
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
	this.on(event,function(e,selector,fn){_(e,selector,fn);
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
// css
Element.prototype.css=function(css){
	css.each(function(val,prop){this.style.setProperty(prop,val)},this);
};
// Template
String.prototype.render=function(data){return this.replace(/\${(.*?)}/g,function(x,g){
	return g.split(/[\.\[\]\'\"]/g).filter(Boolean).reduce(function(obj,i){return obj[i]},data)
})};
// console
const _=console.log;