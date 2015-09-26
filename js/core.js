var body = document.getElementById('body'),
    bodyText = document.getElementById('body-text'),
    res = {},
    noteDelay = 800;
document.onkeypress = function(e){
  if (e.which == 13) {
    chrome.storage.sync.set({'text': bodyText.innerHTML}, function(){});
  }
};
window.onload = function(){
  // delay for fast newtab
  setTimeout(loadNotes, noteDelay);
};
var loadNotes = function() {
  var text = chrome.storage.sync.get('text', function(obj){
    res = obj;
    bodyText.innerHTML = res.text;
  });
};
bodyText.addEventListener('change', function(){
  chrome.storage.sync.set({'text': bodyText.innerHTML}, function() {
    console.log('haha set');
  });
}, false);
window.onbeforeunload = function(e) {
  chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      localStorage['tabs'+i] = tabs[i].url;
    }
  });
};
// not doing anything with bookmarks yet
function processBookmarks(bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) console.log('bookmark: '+ bookmark.title + ' ~  ' + bookmark.url);
        if (bookmark.children) process_bookmark(bookmark.children);
    }
}
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('listing bookmarks: ' );
  try {
    chrome.bookmarks.getTree(processBookmarks);
  } catch (e) {
    console.log('something hapend');
  }
});
