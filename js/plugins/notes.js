var notes = (function(newtabene) {
  const NAME = 'notes',
        ELEMENT_TYPE = 'span',
        CONTENT_EDITABLE = true,
        SPELLCHECK = false,

        SAVE_MESSAGE = 'Notes saved.',
        DEFAULT_CONTENT = 'Huh, there are no notes in my memory.' +
                            'Here is a random fact:' +
                            'You can only pay attention two people' +
                            'speaking at once';

  var element = {};

  var init = function() {
    construct();
  };

  var construct = function(){
    var e = document.createElement(ELEMENT_TYPE);
    e.className = NAME;
    e.id = NAME;
    var note = newtabene.getData(NAME);
    if (note == undefined) note = DEFAULT_CONTENT;
    e.innerHTML = note;
    e.contentEditable = CONTENT_EDITABLE;
    e.spellcheck = SPELLCHECK;
    // crude
    e.dataset.plugin = NAME;
    document.body.appendChild(e);
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
  newtabene.loadNextPlugin();

  return {
    init: init,
    keyPressed: keyPressed
  };

}(newtabene || {}));

newtabene.registerPlugin(notes);
