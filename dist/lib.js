var doc=document;
var dom=document.querySelector.bind(document);
var doms=document.querySelectorAll.bind(document);
Element.prototype.dom=Element.prototype.querySelector;
Element.prototype.doms=Element.prototype.querySelectorAll;
var $=document.querySelector.bind(document);
var $$=document.querySelectorAll.bind(document);
Element.prototype.$=Element.prototype.querySelector;
Element.prototype.$$=Element.prototype.querySelectorAll;
// Event
EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.off = EventTarget.prototype.removeEventListener;
// EventTarget.prototype.dispatch = EventTarget.prototype.dispatchEvent;
// EventTarget.prototype.trigger = EventTarget.prototype.dispatchEvent;
EventTarget.prototype['@on']=function(name,detail){
	this.dispatchEvent(new CustomEvent(name,{detail:detail}));
};
// Attribute
Element.prototype.hasAttr=Element.prototype.hasAttribute;
Element.prototype.removeAttr=Element.prototype.removeAttribute;
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
Element.prototype['?cls']=function(cls){return this.classList.contains(cls)};
// HTML
Element.prototype._innerHTML=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
Object.defineProperty(Element.prototype,'html',Element.prototype._innerHTML);
// Element.prototype['+html']=function(html){this.insertAdjacentHTML('afterbegin',html)}
// Element.prototype['html+']=function(html){this.insertAdjacentHTML('beforeend',html)}
Object.defineProperty(Element.prototype,'+html',{
	set(html){this.insertAdjacentHTML('afterbegin',html)}
});
Object.defineProperty(Element.prototype,'html+',{
	set(html){this.insertAdjacentHTML('beforeend',html)}
});
// Each Loop
NodeList.prototype.each=NodeList.prototype.forEach;
Array.prototype.each=Array.prototype.forEach;
Object.prototype.each=function(func){obj=this;
	for(const key in obj){if(obj.hasOwnProperty(key)&&func){func(obj[key],key,obj)}}
};
// css
Element.prototype.css=function(css){that=this;
	css.each(function(val,prop){that.style.setProperty(prop,val)});
};
// Template
String.prototype.render=function(data){return this.replace(/\${(.*?)}/g,function(x,g){
	return g.split(/[\.\[\]\'\"]/g).filter(Boolean).reduce(function(obj,i){return obj[i]},data)
})};