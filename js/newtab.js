var body = document.getElementById('body'),
    noteSpace = document.getElementById('noteSpace'),
    noteDelay = 600,
    lifeSpan = document.getElementById('life'),
    baseDate = "Thu Oct 29 2015 00:00:00 GMT+0100 (CET)",
    baseLifeSpan = 19712,
    linkParent = document.getElementById('linkParent'),
    numResetButton = document.getElementById('numResetButton')
    address = "",
    addresses = {};
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    if (key === "activeTheme" && storageChange.newValue.str != undefined) {
      setStyle(storageChange.newValue.str)
    }
    // console.log("key:");
    // console.log(key);
    // console.log('Storage key "%s" in namespace "%s" changed. ' +
    //             'Old value was "%s", new value is "%s".',
    //             key,
    //             namespace,
    //             storageChange.oldValue,
    //             storageChange.newValue);
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
var loadNotes = function() {
  // when working on localhost chrome.storage is undefined
  var text = chrome.storage.sync.get('text', function(obj){
    noteSpace.innerHTML = obj.text;
  });
};
numResetButton.addEventListener("click", function(e) {
  chrome.storage.sync.set({"addresses": {}}, function(obj){
    window.location = window.location.href;
  });
}, false);
var checkDate = function() {
  var today = new Date(),
      baseDay = new Date(baseDate);
  var diff = today.getTime() - baseDay.getTime();
  diff = Math.floor(diff/86400000);
  lifeSpan.innerHTML = 19712 - diff;
}
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
}
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
  // delay for fast loading
  getSetStyle("activeTheme");
  setTimeout(loadNotes, noteDelay);
  setTimeout(loadLinkNumbers, noteDelay);
  checkDate();
};
// chrome.notifications.create("", {message:"Hello World!", title: "Hi!", type: "basic", iconUrl:"./assets/favicon.png"})
// var tim = setTimeout(function(){chrome.notifications.create("", {message:"Stahp tha work!", title: "Hey!", type: "basic", iconUrl:"./assets/favicon.png"})}, 25*60000);
