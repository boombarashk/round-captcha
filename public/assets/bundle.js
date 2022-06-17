(()=>{"use strict";const e=Math.random()<.5,t="black";let i=!1,o=[];class r{figures;config;container;count;counter=0;timeout;scale;constructor(e={}){this.config=e,this.count=e.count||5,this.diameter=e.diameter||10,this.timeout=e.timeout||6e4,this.scale=e.scale||1,this.figures=new Array(this.count),this.onClickFigure=this.onClickFigure.bind(this),this.onHoverFigure=this.onHoverFigure.bind(this),this.onLeaveFigure=this.onLeaveFigure.bind(this),this.init()}init(){const{containerClassName:t}=this.config;if(this.container=document.getElementsByClassName(t)[0],!t||!this.container)throw Error("Bloque de ubicación no encontrado");i=e,o=(e=>{const t=Array.from(Array(e).keys());for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t})(this.count),this.taskText();for(let e=0;e<this.count;e++)this.drawFigure(e);const r=this.createBlock();r.style.display="flex",this.figures.forEach((e=>r.append(e))),this.start()}createBlock(e={}){const t=document.createElement("div"),{className:i="",height:o,width:r,round:s=!1,text:n="",addBlock:a=!0}=e;return t.className=i,o&&(t.style.height=o),s?(t.style.width=o,t.style.borderRadius="50%"):r&&(t.style.width=r),n.length&&(t.innerText=n),a&&this.container.append(t),t}drawFigure(e){const i=(o[e]+1)*this.diameter*this.scale,r=this.createBlock({addBlock:!1,round:!0,height:`${i}px`});r.style.backgroundColor=this.config.colorBg||t,this.figures.push(r)}taskText(){const e=i?"descendente":"ascendente";this.createBlock({text:`Organizar en orden ${e}  de área:`,className:"root-round-captcha-text"})}start(){this.figures.forEach((e=>this.addEvents(e)))}stop(e=!0){this.figures.forEach((e=>this.removeEvents(e))),alert(e?"OK":"NO")}addEvents(e){e.addEventListener("click",this.onClickFigure,!1),e.addEventListener("mouseenter",this.onHoverFigure,!1),e.addEventListener("mouseleave",this.onLeaveFigure,!1)}removeEvents(e){e.removeEventListener("click",this.onClickFigure,!1),e.removeEventListener("mouseenter",this.onHoverFigure,!1),e.removeEventListener("mouseleave",this.onLeaveFigure,!1)}onClickFigure(e){const t=this.getChildIndex(e.target),r=i?o.length-this.counter-1:this.counter;t===o.indexOf(r)?(this.counter+=1,e.target.style.backgroundColor=this.config.colorDisabled||"white",5===this.counter?this.stop(!0):this.removeEvents(e.target)):this.stop(!1)}onHoverFigure(e){const t=this.getChildIndex(e.target);o.indexOf(t)&&this.config.colorBgHover&&(e.target.style.backgroundColor=this.config.colorBgHover)}onLeaveFigure(e){e.target.style.backgroundColor=this.config.colorBg||t}getChildIndex(e){return Array.prototype.indexOf.call(e.parentNode.childNodes,e)}}const s=JSON.parse('{"colorBg":"#0b5cad","colorBgHover":"#207edd","colorDisabled":"lightgray","containerClassName":"root-round-captcha"}');window.onload=()=>new r(s)})();