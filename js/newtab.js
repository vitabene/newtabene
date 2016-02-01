'use strict';

const ESCAPE_KEYCODE = 27,
      ENTER_KEYCODE = 13;

var newtabene = (function(){

  var data = {},
      plugins = [],
      // to do
      pluginsLoaded = [],
      scriptsParent = 'scriptsParent',
      changeDependecies = [],
      loadIndex = 0;

  var init = function(){
    if (plugins.length !== 0) loadNextPlugin();
    addHandlers();
  };

  var loadNextPlugin = function() {
    if (plugins.length == loadIndex) return;
    var scr = document.createElement('script');
    // clumsy
    if (plugins[loadIndex] !== "") {
      scr.src = "../js/plugins/" + plugins[loadIndex] + ".js";
      document.body.appendChild(scr);
    } else {
      // loadNextPlugin();
    }
      loadIndex++;
  };

  var addHandlers = function() {
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (var key in changes) {
        var storageChange = changes[key];
        // crude
        if (key === "activeTheme" && storageChange.newValue.str != undefined) {
          setStyle(storageChange.newValue.str)
        }
        if (changeDependecies.indexOf(key) !== -1) changeDependecies[key].call();
        if (key === "activePlugins") window.location = window.location;
      }
    });
    document.onkeydown = function(e) {
      if (e.keyCode == ESCAPE_KEYCODE || e.keyCode == ENTER_KEYCODE) {
        var pluginName = e.target.dataset.plugin;
        if (plugins.indexOf(pluginName) !== -1) {
          window[pluginName].keyPressed(e.keyCode);
        }
      }
      if (e.keyCode == ESCAPE_KEYCODE) e.target.blur();
    };
  };

  var getData = function(key){
    return data[key];
  };

  var loadData = function(){
    var nwt = this;
    chrome.storage.sync.get(null, function(o){
      data = o;
      plugins = o.activePlugins;
      init();
    });
  };

  var registerPlugin = function(plugin) {
    // plugins.push(plugin);
  }

  var registerChangeKey = function(key, fn) {
    changeDependecies[key] = fn;
  };

  return {
    loadData: loadData,
    registerChangeKey: registerChangeKey,
    registerPlugin: registerPlugin,
    loadNextPlugin: loadNextPlugin,
    getData: getData
  };
})();

newtabene.loadData();

// ******************** non-modularized follows ********************
// ******************** functions ********************
// var loadSettings = function() {
//   chrome.storage.sync.get("settings", function(o){
//     var s = o.settings, sKeys = Object.keys(o.settings);
//     for (var i = 0; i < sKeys.length; i++) {
//       var setting = s[sKeys[i]];
//       if (setting != "body" && setting.active == "true") {
//         //
//       }
//     }
//   });
// };
// ******************** event handlers ********************

window.onload = function(){
  getSetStyle("activeTheme");
  // loadSettings();
};
// ******************** unused code snippets ********************
// chrome.notifications.create("", {message:"Hello World!", title: "Hi!", type: "basic", iconUrl:"./assets/favicon.png"})
// var tim = setTimeout(function(){chrome.notifications.create("", {message:"Stahp tha work!", title: "Hey!", type: "basic", iconUrl:"./assets/favicon.png"})}, 25*60000);
// chrome.storage.sync.get(null, function(obj){console.log(Object.keys(obj))})
