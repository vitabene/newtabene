var quote = (function() {
  const NAME = 'quote',
        ELEMENT_TYPE = 'quote',
        CONTENT_EDITABLE = true,
        SPELLCHECK = false,
        DEF_QUOTE = 'Adapt what is useful, reject what is useless, and add what is specifically your own.';

  var element = {};

  var init = function() {
    construct();
  };

  var construct = function(){
    var e = document.createElement(ELEMENT_TYPE);
    e.className = NAME;
    e.id = NAME;
    var quote = newtabene.getData(NAME);
    if (typeof quote === "undefined") {
      quote = DEF_QUOTE;
    }
    e.innerHTML = quote;
    e.contentEditable = CONTENT_EDITABLE;
    e.spellcheck = SPELLCHECK;
    e.dataset.plugin = NAME;
    document.body.appendChild(e);
    element = e;
  };

  var keyPressed = function(keyCode) {
    if (keyCode == ENTER_KEYCODE || keyCode == ESCAPE_KEYCODE) save();
  };

  var save = function(){
    chrome.storage.sync.set({
       'quote': element.innerHTML
       }, function(){
         console.log('Quote saved.');
     });
  };

  init();
  newtabene.loadNextPlugin();

  return {
    init: init,
    keyPressed: keyPressed
  };

}(newtabene || {}));
