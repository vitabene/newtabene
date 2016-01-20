var countdown = (function() {
  const NAME = 'countdown',
        ELEMENT_TYPE = 'span',
        // should be 'countdown'
        CLASS = 'life-span';

  var number = 0;

  var init = function() {
    checkLastOpen();
    construct();
  };

  var construct = function(){
    var e = document.createElement(ELEMENT_TYPE);
    e.className = CLASS;
    e.id = NAME;
    e.innerHTML = number;
    document.body.appendChild(e);
  };

  var checkLastOpen = function() {
    // crude
    var lastDate = new Date(newtabene.getData("lastOpen")),
        today = new Date(),
        countdown = newtabene.getData(NAME);
        number = countdown;
    if (today.getDate() != lastDate.getDate()) {
      chrome.storage.sync.set({
        'countdown': --countdown,
        'lastOpen': new Date().toString()
      });
    }
  };

  init();
  newtabene.loadNextPlugin();

  return {
    init: init
  };
}(newtabene || {}));
