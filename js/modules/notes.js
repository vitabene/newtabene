var notes = (function(newtabene) {
  const NAME = 'notes',
        ELEMENT_TYPE = 'span',
        CONTENT_EDITABLE = true,
        SPELLCHECK = false,

        SAVE_MESSAGE = 'Notes saved.',
        DEFAULT_CONTENT = 'No notes in my memory. Click here to edit.';

  var element = {};

  var init = function() {
    construct();
  };

  var construct = function(){
    var modLayer = document.createElement('div'),
        e = document.createElement(ELEMENT_TYPE);
    modLayer.className = "mod-layer";
    e.className = NAME;
    e.id = NAME;
    var note = newtabene.getData(NAME);
    if (note == undefined) note = DEFAULT_CONTENT;
    e.innerHTML = note;
    e.contentEditable = CONTENT_EDITABLE;
    e.spellcheck = SPELLCHECK;
    // crude
    e.dataset.plugin = NAME;
    modLayer.appendChild(e);
    document.body.appendChild(modLayer);
    element = e;
  };

  var keyPressed = function(keyCode) {
    if (keyCode == ENTER_KEYCODE || keyCode == ESCAPE_KEYCODE) save();
  };

  var save = function(){
    chrome.storage.sync.set({
       'notes': element.innerHTML
       }, function(){
         console.log(SAVE_MESSAGE);
     });
  };

  init();
  newtabene.loadNextModule();

  return {
    init: init,
    keyPressed: keyPressed
  };

}(newtabene || {}));

newtabene.registerPlugin(notes);
