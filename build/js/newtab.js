"use strict";const ESCAPE_KEYCODE=27,ENTER_KEYCODE=13,DEFAULT_PLUGINS=["countdown","links","linkNums","notes","quote"];var newtabene=function(){var n={},e=[],t=[],o=0,i=function(){c(),0!==e.length&&s(),r()},c=function(){chrome.storage.sync.get(null,function(n){"undefined"==typeof n.theme&&u()})},a=function(){chrome.storage.sync.get(null,function(n){console.log(n)})},u=function(){var n={body:{},".notes":{},".quote":{},".links":{},".linkNums":{},".countdown":{}};chrome.storage.sync.set({theme:n})},s=function(){if(e.length!=o){var n=document.createElement("script");""!==e[o]&&(n.src="../js/modules/"+e[o]+".js",document.body.appendChild(n)),o++}},r=function(){chrome.storage.onChanged.addListener(function(n,e){for(var o in n){var i=n[o];"activeTheme"===o&&void 0!=i.newValue.str&&setStyle(i.newValue.str),t.indexOf(o)!==-1&&t[o].call(),"activePlugins"!==o&&"links"!==o||(window.location=window.location),"countdown"===o&&(window.location=window.location)}}),document.onkeydown=function(n){if(n.keyCode==ESCAPE_KEYCODE||n.keyCode==ENTER_KEYCODE){var t=n.target.dataset.plugin;e.indexOf(t)!==-1&&window[t].keyPressed(n.keyCode)}n.keyCode==ESCAPE_KEYCODE&&n.target.blur()}},l=function(e){return n[e]},d=function(){chrome.storage.sync.get(null,function(t){n=t,e=void 0==t.activePlugins?DEFAULT_PLUGINS:t.activePlugins,chrome.storage.sync.set({activePlugins:e}),i()})},g=function(n,e){t[n]=e};return d(),{loadData:d,registerChangeKey:g,loadNextModule:s,checkStorage:a,getData:l}}();