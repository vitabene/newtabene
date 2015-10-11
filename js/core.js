var body = document.getElementById('body'),
    noteSpace = document.getElementById('noteSpace'),
    noteDelay = 800;
var loadNotes = function() {
  // when working on localhost chrome.storage is undefined
  var text = chrome.storage.sync.get('text', function(obj){
    noteSpace.innerHTML = obj.text;
  });
};
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
