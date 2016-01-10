'use strict';
var newtabene = (function(){
  const delay = 100;
  var data = {},
      plugins = [],
      scriptsParent = 'scriptsParent',
      changeDependecies = [];

  var init = function(){
    if (plugins.length !== 0) loadPlugins();
    addHandlers();
  };

  var loadPlugins = function() {
    for (var i = 0; i < plugins.length; i++) {
      var scr = document.createElement('script');
      scr.src = "../js/plugins/" + plugins[i] + ".js";
      document.body.appendChild(scr);
    }
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
      }
    });
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
    getData: getData
  };
})();

newtabene.loadData();

// ******************** non-modularized follows ********************
// ******************** functions ********************
var loadSettings = function() {
  chrome.storage.sync.get("settings", function(o){
    var s = o.settings, sKeys = Object.keys(o.settings);
    for (var i = 0; i < sKeys.length; i++) {
      var setting = s[sKeys[i]];
      if (setting != "body" && setting.active == "true") {
        //
      }
    }
  });
};
// ******************** event handlers ********************
document.onkeydown = function(e) {
  console.log(e);
//   if (e.keyCode == 27 || e.keyCode == 13)
//     chrome.storage.sync.set({
//       'text': noteSpace.innerHTML,
//       'quote': quote.innerHTML
//       }, function(){
//         console.log('Notes and quote saved.');
//     });
//   if (e.keyCode == 27) {
//     noteSpace.blur();
//     quote.blur();
//   }
};
window.onload = function(){
  getSetStyle("activeTheme");
  loadSettings();
};
// ******************** unused code snippets ********************
// chrome.notifications.create("", {message:"Hello World!", title: "Hi!", type: "basic", iconUrl:"./assets/favicon.png"})
// var tim = setTimeout(function(){chrome.notifications.create("", {message:"Stahp tha work!", title: "Hey!", type: "basic", iconUrl:"./assets/favicon.png"})}, 25*60000);
// chrome.storage.sync.get(null, function(obj){console.log(Object.keys(obj))})
