var linkNums=function(e,n){const t="addresses",r="span",s="linkNums";var d={},i=[],a=function(){o(),e.registerChangeKey("lastOpen",l),c(),e.loadNextModule()},o=function(){d=n.getParent(),i=e.getData(t),void 0==i&&(i=[],l());for(var a=0;a<d.children.length;a++){var o=document.createElement(r);if(o.className=s,void 0==i)return;var c=d.children[a],f=i[c.firstChild.href];void 0==f&&(f=0),o.innerHTML=f,c.appendChild(o)}},c=function(){d.addEventListener("click",function(e){e.preventDefault(),address=e.target.href,"undefined"==typeof i[address]&&(i[address]=0),i[address]++,e.target.nextSibling.innerHTML=i[address],chrome.storage.sync.set({addresses:i},function(e){window.location=address})},!1)},l=function(){chrome.storage.sync.set({addresses:{}},function(e){window.location=window.location.href})};return a(),{init:a}}(newtabene||{},links||{});