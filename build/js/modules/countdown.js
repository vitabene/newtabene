var countdown=function(){const e="countdown",n="span",t=7;var a=0,o=function(){c(),d()},d=function(){var t=document.createElement("div"),o=document.createElement(n);t.className="mod-layer",o.className=e,o.id=e,o.innerHTML=a,t.appendChild(o),document.body.appendChild(t)},c=function(){var n=new Date(newtabene.getData("lastOpen")),o=new Date,d=newtabene.getData(e);"undefined"==typeof d&&(d=t),a=d,o.getDate()!=n.getDate()&&chrome.storage.sync.set({countdown:--d,lastOpen:(new Date).toString()})};return o(),newtabene.loadNextModule(),{init:o}}(newtabene||{});