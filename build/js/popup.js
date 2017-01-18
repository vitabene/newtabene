var styles="",style="",theme="",element="",saveButton=document.getElementById("saveButton"),styleParent=document.getElementById("styleParent"),inputField=document.getElementById("inputField"),settingsParent=document.getElementById("settingsParent"),elementParent=document.getElementById("elementParent"),selectedElementField=document.getElementById("selectedElementField"),AVAILABLE_EXTENSIONS=["links","notes","linkNums","countdown","quote"],themes={default:{body:{"background-color":"rgb(6, 14, 38)",color:"rgb(242, 221, 159)","font-family":"King"},".notes":{"background-color":"rgb(6, 14, 38)",color:"rgb(242, 221, 159)","font-family":"King"},".quote":{"font-family":"Colleged",color:"rgb(187, 42, 77)","text-shadow":"1px 1px 1px navajowhite"}}},settingsObject={settings:{body:{data:["lastOpen"]},".life-span":{active:"false",parentType:"span",class:"life-span",data:["daysLeft"],id:"life"},".link-number":{active:"true",elementType:"span",data:["addresses"],class:"link-number",id:""},".links":{active:"true",data:["links","linkTitles"],parentType:"ul",elementType:"li",class:"links",id:"linkParent"},".notes":{active:"true",parentType:"span",contenteditable:"true",data:["text"],spellcheck:"false",class:"notes",id:"noteSpace"},".quote":{active:"true",parentType:"quote",data:["quote"],class:"quote",contenteditable:"true",id:"quote"}}},applyTheme=function(){chrome.storage.sync.get("theme",function(e){theme=e;var t=Object.keys(theme.theme),n="";for(rule in t){var a=theme.theme[t[rule]],l=Object.keys(a);n+="#newtab "+t[rule]+" {";for(var s=0;s<l.length;s++){var o=l[s]+":"+a[l[s]]+";";n+=o}n+="}"}chrome.storage.sync.set({activeTheme:{str:n}})})},applyThemeChange=function(e,t,n){chrome.storage.sync.get("theme",function(a){var l=a.theme;void 0===l[e]&&(l[e]={}),void 0===l[e][t]&&(l[e][t]=""),l[e][t]=n,chrome.storage.sync.set({theme:l},function(){applyTheme()})})},resetPlugins=function(){chrome.storage.sync.set({activePlugins:["links","notes","linkNums","countdown","quote"]},function(e){console.log(e)})},cleanInputs=function(){for(var e=document.getElementsByClassName("style-input"),t=0;t<e.length;t++){var n=e[t];n.value=""}},loadToInputs=function(e){if(void 0!=styles){var t=document.getElementsByClassName("style-input"),n=[];for(s=0;s<t.length;s++){var a=t[s];n.push(a.name)}for(var l=document.styleSheets,s=0;s<l.length;s++)for(var o=l[s].cssRules,c=0;c<o.length;c++){var r=o[c];if(r.selectorText=="#newtab "+e)for(var i=0;i<n.length;i++){var m=r.style[n[i]];if(""!=m){var a=t[i];a.value=m}}}for(s=0;s<t.length;s++){var a=t[s],r=a.name;void 0!=styles[r]&&(a.value=styles[r]),""==a.value&&(a.placeholder="not set")}}};window.onload=function(){chrome.storage.sync.get("activePlugins",function(e){for(var t=e.activePlugins,n=0;n<AVAILABLE_EXTENSIONS.length;n++){var a=AVAILABLE_EXTENSIONS[n],l=document.createElement("li"),s=document.createElement("span"),o=document.createElement("input");l.className="element",l.id="."+a,s.innerHTML=a,s.dataset.plugin=a,o.type="checkbox",t.indexOf(a)!==-1&&(o.checked=!0),l.appendChild(s),l.appendChild(o),elementParent.appendChild(l)}})};var save=function(){chrome.storage.sync.get("theme",function(e){for(var t=e.theme,n=document.getElementsByClassName("style-input"),a=0;a<n.length;a++){var l=n[a],s=l.name;if(""!=l.value){styles[s]=l.value;var o=selectedElementField.value;void 0===t[o]&&(t[o]={}),void 0===t[o][s]&&(t[o][s]=""),t[o][s]=l.value,"background-color"!=s&&"color"!=s||l.value.indexOf("#")===-1&&(t[o][s]="#"+l.value),"margin"==s&&("0"==l.value?(console.log(l.value),console.log(s),t[o]["margin-right"]=0,t[o]["margin-left"]=0):"auto"==l.value&&(t[o]["margin-right"]="auto",t[o]["margin-left"]="auto"))}}chrome.storage.sync.set({theme:t},function(){applyTheme()})})};document.addEventListener("click",function(e){var t=e.target,n=e.target.id;if("element"==t.parentNode.className&&"checkbox"!=t.type?(t=t.parentNode,n=t.id):"checkbox"==t.type&&(t.checked?chrome.storage.sync.get("activePlugins",function(e){var n=e.activePlugins,a=t.previousElementSibling;void 0!=a.dataset.plugin&&(n.push(a.dataset.plugin),chrome.storage.sync.set({activePlugins:n},function(){}))}):chrome.storage.sync.get("activePlugins",function(e){var n=e.activePlugins,a=t.previousElementSibling;if(void 0!=a.dataset.plugin){console.log(a.dataset.plugin);var l=n.indexOf(a.dataset.plugin);n.splice(l,1),chrome.storage.sync.set({activePlugins:n},function(){})}})),t.className.indexOf("element")!==-1){selectedElementField.value=n;var a=document.getElementById("elementSelect"),l=document.getElementById("styleSelect");chrome.storage.sync.get("theme",function(e){var t=e.theme,a=Object.keys(t);a.indexOf(n)!==-1&&(styles=t[n]),cleanInputs(),loadToInputs(n)}),a.className+=" slide-left",l.className+=" slide-from-right"}if("style"==t.className)for(var s=t.dataset.ctrls,o=document.getElementById(s),c=document.getElementsByClassName("style-controls"),r=0;r<c.length;r++)c[r]!=o?c[r].className=c[r].className.replace("active-controls",""):c[r].className.indexOf("active-controls")!==-1?c[r].className=c[r].className.replace("active-controls",""):c[r].className=c[r].className+" active-controls";if("saveButton"==n&&save(),"elementBackButton"==n){var a=document.getElementById("elementSelect"),l=document.getElementById("styleSelect");a.className=a.className.replace(" slide-left"," slide-from-left"),setTimeout(function(){a.className=a.className.replace(" slide-from-left"," ")}),l.className=l.className.replace(" slide-from-right"," slide-right");var c=document.getElementsByClassName("active-controls")[0];c.className=c.className.replace(" active-controls"," ")}if(t.className.indexOf("tab")!==-1)for(var i=document.getElementsByClassName("tab"),r=0;r<i.length;r++){var m=document.getElementById(i[r].id+"Content");i[r]!=t?(i[r].className=i[r].className.replace("active",""),m.className=m.className.replace("active","")):(i[r].className=i[r].className+" active",m.className=m.className+" active")}if("contentLink"==t.id||"contentLink"==t.parentNode.id){e.preventDefault();var a=document.getElementById("selectedElementField"),u="./"+a.value.substring(1)+".html";try{var d=new XMLHttpRequest;d.open("HEAD",u,!1),d.send(),404!=d.status&&(window.location=u)}catch(e){console.log(e);var g=document.getElementById("contentLink");g.children[0].style.background="red",setTimeout(function(){g.children[0].style.background="white"},200)}}if("resetMarginButton"==t.id){var v=document.getElementById("position"),p=document.getElementById("top"),y=document.getElementById("bottom"),f=document.getElementById("left"),h=document.getElementById("right"),E=(document.getElementById("center"),document.getElementById("margin"));y.value="none",p.value="none",f.value="none",h.value="none",E.value="0";var N=document.getElementById("marginTop"),B=document.getElementById("marginLeft"),I=document.getElementById("marginBottom"),k=document.getElementById("marginRight");N.value="0",B.value="0",I.value="0",k.value="0",v.value="static",saveButton.click()}if(t.className.indexOf("arrow")!==-1){var b={};switch(t.id){case"arrowUp":var b=document.getElementById("marginTop"),T=b.value;""==T?b.value="0":(T=T.replace(/\r?\n|\%|\r/g,""),T=parseInt(T)-20,b.value=T+"px",save());break;case"arrowLeft":var b=document.getElementById("marginLeft"),T=b.value;""==T?b.value="0":(T=T.replace(/\r?\n|\%|\r/g,""),T=parseInt(T)-20,b.value=T+"px",save());break;case"arrowRight":var b=document.getElementById("marginLeft"),T=b.value;""==T?b.value="20px":(T=T.replace(/\r?\n|\%|\r/g,""),T=parseInt(T)+20,b.value=T+"px",save());break;case"arrowDown":var b=document.getElementById("marginTop"),T=b.value;""==T?b.value="20px":(T=T.replace(/\r?\n|\%|\r/g,""),T=parseInt(T)+20,b.value=T+"px",save())}}},!1),document.onkeydown=function(e){13==e.keyCode&&save()};