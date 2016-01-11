var notes = (function(newtabene) {
  var elementType = "span",
      classStr = "notes",
      idStr = "noteSpace",
      storageStr = "text",
      contentEditable = 'true',
      spellCheck = 'false',
      element = {};

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
    // crude
    e.dataset.plugin = classStr;
    document.body.appendChild(e);
    element = e;
  };

  var keyPressed = function(keyCode) {
    if (keyCode == 13 || keyCode == 27) save();
  };

  var save = function(){
    chrome.storage.sync.set({
       'text': element.innerHTML
       }, function(){
         console.log('Notes saved.');
     });
  };

  init();

  return {
    init: init,
    keyPressed: keyPressed
  };

}(newtabene || {}));

newtabene.registerPlugin(notes);
