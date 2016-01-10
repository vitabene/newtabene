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
    document.body.appendChild(e);
  };

  init();

  return {
    init: init
  };
}(newtabene || {}));

newtabene.registerPlugin(notes);
