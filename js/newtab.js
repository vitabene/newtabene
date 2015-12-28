// ******************** variables ********************
var newtabene = {};
var body = document.getElementById('body'),
    noteSpace = document.getElementById('noteSpace'),
    quote = document.getElementById('quote'),
    lifeSpan = document.getElementById('life'),
    linkParent = document.getElementById('linkParent'),
    noteDelay = 100,
    address = "",
    addresses = {};
// ******************** functions ********************
var loadNotes = function() {
  chrome.storage.sync.get('text', function(obj){
    noteSpace.innerHTML = obj.text;
  });
};
var loadQuote = function() {
  chrome.storage.sync.get('quote', function(obj){
    quote.innerHTML = obj.quote;
  });
};
var checkLastOpen = function() {
  chrome.storage.sync.get(["daysLeft", "lastOpen"], function(obj){
    var lastDate = new Date(obj.lastOpen),
        today = new Date(),
        daysLeft = obj.daysLeft;
    var diff = today.getTime() - lastDate.getTime();
    diff = Math.floor(diff/86400000);
    if (diff > 0) chrome.storage.sync.set({"daysLeft": --daysLeft});
    lifeSpan.innerHTML = daysLeft;
  });
};
var loadLinkNumbers = function() {
  chrome.storage.sync.get('addresses', function(obj){
    if (obj != undefined) addresses = obj.addresses;
    for (var i = 0; i < linkParent.children.length; i++) {
      var el = linkParent.children[i];
      var address = addresses[el.firstChild.href];
      if (address == undefined) address = 0;
      el.lastChild.innerHTML = address;
    }
  });
};
function constructLink(url, title) {
  var li = document.createElement('li'),
      a = document.createElement('a');
  a.href = url;
  a.innerHTML = title;
  li.appendChild(a);
  document.getElementById('linkParent').appendChild(li);
}
// ******************** event handlers ********************
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
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
    e = e || window.event;
    if (e.keyCode == 27 || e.keyCode == 13) {
      chrome.storage.sync.set({'text': noteSpace.innerHTML}, function(){
        console.log('Notes have been saved.');
      });
    }
    if (e.keyCode == 27) noteSpace.blur();
};
window.onload = function(){
  getSetStyle("activeTheme");
  setTimeout(loadNotes, noteDelay);
  setTimeout(loadQuote, noteDelay);
  setTimeout(loadLinkNumbers, noteDelay);
  checkLastOpen();
};
// ******************** unused code snippets ********************
// chrome.notifications.create("", {message:"Hello World!", title: "Hi!", type: "basic", iconUrl:"./assets/favicon.png"})
// var tim = setTimeout(function(){chrome.notifications.create("", {message:"Stahp tha work!", title: "Hey!", type: "basic", iconUrl:"./assets/favicon.png"})}, 25*60000);
// chrome.storage.sync.get(null, function(obj){console.log(Object.keys(obj))})
