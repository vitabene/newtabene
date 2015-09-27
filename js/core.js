var body = document.getElementById('body'),
    noteSpace = document.getElementById('noteSpace'),
    noteDelay = 800;
document.onkeypress = function(e){
  if (e.which == 13) {
    chrome.storage.sync.set({'text': noteSpace.innerHTML}, function(){
      console.log('Notes have been saved.');
    });
  }
};
window.onload = function(){
  // delay for fast loading
  setTimeout(loadNotes, noteDelay);
};
var loadNotes = function() {
  var text = chrome.storage.sync.get('text', function(obj){
    noteSpace.innerHTML = obj.text;
  });
};
// not doing anything with bookmarks yet
window.onbeforeunload = function(e) {
  chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      localStorage['tabs'+i] = tabs[i].url;
    }
  });
};
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
    console.error('following error has occured: ' + e);
  }
});
