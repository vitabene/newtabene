'use strict';
// ******************** variables ********************
var body = document.getElementById('body'),
    noteSpace = {},
    quote = document.getElementById('quote'),
    lifeSpan = document.getElementById('life'),
    linkParent = document.getElementById('linkParent'),
    noteDelay = 100, address = "", addresses = {};

var newtabene = (function(){
  const delay = 100;
  var data = {},
      plugins = [];

  var init = function(){
    // construct activeElements
    if (plugins.length !== 0) loadPlugins();
  };

  var loadPlugins = function() {
    for (var i = 0; i < plugins.length; i++) {
      plugins[i].init();
    }
  };

  var getData = function(key){
    return data[key];
  };

  var loadData = function(){
    var nwt = this;
    chrome.storage.sync.get(null, function(o){
      data = o;
      init();
    });
  };

  var registerPlugin = function(plugin) {
    plugins.push(plugin);
  }

  return {
      loadData: loadData,
      registerPlugin: registerPlugin,
      getData: getData
  };
})();
newtabene.loadData();

var notes = (function(newtabene) {
  var elementType = "span",
      classStr = "notes",
      idStr = "noteSpace",
      storageStr = "text",
      contentEditable = 'true',
      spellCheck = 'false';

  var init = function() {
    construct();
  };

  var construct = function(){
    var e = document.createElement(elementType);
    e.className = classStr;
    e.id = idStr;
    e.innerHTML = newtabene.getData(storageStr);
    e.contentEditable = contentEditable;
    e.spellcheck = spellCheck;
    console.log(e);
    document.body.appendChild(e);
  };

  return {
    init: init
  };
}(newtabene || {}));

newtabene.registerPlugin(notes);





// ******************** functions ********************
var load = function() {
  // text is contents of note section
  // quote is contents of quote
  // links are clickable links
  // linkTitles are titles of the links
  // addresses are are address:numClicked pairs
  var toLoad = ['text', 'quote', 'links', 'linkTitles', 'addresses'];
  chrome.storage.sync.get(toLoad, function(o){
    noteSpace.innerHTML = o.text;
    quote.innerHTML = o.quote;
    for (var i = 0; i < o.links.length; i++) {
      constructLink(o.links[i], o.linkTitles[i]);
    }
    for (i = 0; i < linkParent.children.length; i++) {
      if (o != undefined) addresses = o.addresses;
      var el = linkParent.children[i];
      var address = addresses[el.firstChild.href];
      if (address == undefined) address = 0;
      el.lastChild.innerHTML = address;
    }
  });
};
var loadSettings = function() {
  chrome.storage.sync.get("settings", function(o){
    var s = o.settings, sKeys = Object.keys(o.settings);
    for (var i = 0; i < sKeys.length; i++) {
      var setting = s[sKeys[i]];
      if (setting != "body" && setting.active == "true") {
        // load the thing
        // console.log(s[sKeys[i]]);
        // var el = document.createElement(setting.parentType);
        // el.className = setting.class;
        // el.id = setting.id;
        // document.body.appendChild(el);
      }
    }
  });
};
var checkLastOpen = function() {
  // daysLeft is number of days left
  // lastOpen is last day the new tab was opened
  chrome.storage.sync.get(["daysLeft", "lastOpen"], function(obj){
    var lastDate = new Date(obj.lastOpen),
        today = new Date(),
        daysLeft = obj.daysLeft;
    if (today.getDate() != lastDate.getDate()) {
      chrome.storage.sync.set({
        "daysLeft": --daysLeft,
        "lastOpen": new Date().toString()
      });
    }
    lifeSpan.innerHTML = daysLeft;
  });
};
function constructLink(url, title) {
  var li = document.createElement('li'),
      a = document.createElement('a'),
      span = document.createElement('span');
  a.href = url;
  a.innerHTML = title;
  span.innerHTML = "#";
  span.className = "link-number";
  li.appendChild(a);
  li.appendChild(span);
  document.getElementById('linkParent').appendChild(li);
}
// ******************** event handlers ********************
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    if (key === "activeTheme" && storageChange.newValue.str != undefined) {
      setStyle(storageChange.newValue.str)
    }
    if (key === "daysLeft") {
      chrome.storage.sync.set({"addresses": {}}, function(obj){
        window.location = window.location.href;
      });
    }
  }
});
linkParent.addEventListener("click", function(e) {
  e.preventDefault();
  address = e.target.href;
  if (addresses[address] == undefined) addresses[address] = 0;
  addresses[address]++;
  e.target.nextSibling.innerHTML = addresses[address];
  chrome.storage.sync.set({'addresses': addresses}, function(obj){
    console.log('Addresses set.');
    window.location = address;
  });
}, false);
document.onkeydown = function(e) {
  if (e.keyCode == 27 || e.keyCode == 13)
    chrome.storage.sync.set({
      'text': noteSpace.innerHTML,
      'quote': quote.innerHTML
      }, function(){
        console.log('Notes and quote saved.');
    });
  if (e.keyCode == 27) {
    noteSpace.blur();
    quote.blur();
  }
};
window.onload = function(){
  getSetStyle("activeTheme");
  setTimeout(load, noteDelay);
  checkLastOpen();
  loadSettings();
  // document.open();
  // document.write('<script src="../js/background.js"></script><p>"ta"</p>');
  // document.close();
};
// ******************** unused code snippets ********************
// chrome.notifications.create("", {message:"Hello World!", title: "Hi!", type: "basic", iconUrl:"./assets/favicon.png"})
// var tim = setTimeout(function(){chrome.notifications.create("", {message:"Stahp tha work!", title: "Hey!", type: "basic", iconUrl:"./assets/favicon.png"})}, 25*60000);
// chrome.storage.sync.get(null, function(obj){console.log(Object.keys(obj))})
