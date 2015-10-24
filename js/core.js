var body = document.getElementById('body'),
    noteSpace = document.getElementById('noteSpace'),
    noteDelay = 800;
var loadNotes = function() {
  // when working on localhost chrome.storage is undefined
  var text = chrome.storage.sync.get('text', function(obj){
    noteSpace.innerHTML = obj.text;
  });
};
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
  setTimeout(loadNotes, noteDelay);
};
