// ******************** variables ********************
var body = document.getElementById('body'),
    noteSpace = document.getElementById('noteSpace'),
    quote = document.getElementById('quote'),
    lifeSpan = document.getElementById('life'),
    linkParent = document.getElementById('linkParent'),
    noteDelay = 100, address = "", addresses = {};
// var newtabene = (function(){})();
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
  if (e.keyCode == 27 || e.keyCode == 13)
    chrome.storage.sync.set({'text': noteSpace.innerHTML}, function(){
      console.log('Notes have been saved.');
    });
  if (e.keyCode == 27) noteSpace.blur();
};
window.onload = function(){
  getSetStyle("activeTheme");
  setTimeout(load, noteDelay);
  checkLastOpen();
};
// ******************** unused code snippets ********************
// chrome.notifications.create("", {message:"Hello World!", title: "Hi!", type: "basic", iconUrl:"./assets/favicon.png"})
// var tim = setTimeout(function(){chrome.notifications.create("", {message:"Stahp tha work!", title: "Hey!", type: "basic", iconUrl:"./assets/favicon.png"})}, 25*60000);
// chrome.storage.sync.get(null, function(obj){console.log(Object.keys(obj))})
