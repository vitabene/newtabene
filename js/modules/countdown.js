var countdown = (function() {
  const NAME = 'countdown',
        ELEMENT_TYPE = 'span',
        DEF_NUM = 7;

  var number = 0;

  var init = function() {
    checkLastOpen();
    construct();
  };

  var construct = function(){
    var modLayer = document.createElement('div'),
        e = document.createElement(ELEMENT_TYPE);
    modLayer.className = "mod-layer";
    e.className = NAME;
    e.id = NAME;
    e.innerHTML = number;
    modLayer.appendChild(e);
    document.body.appendChild(modLayer);
  };

  var checkLastOpen = function() {
    // crude
    var lastDate = new Date(newtabene.getData("lastOpen")),
        today = new Date(),
        countdown = newtabene.getData(NAME);
        if (typeof countdown === "undefined") countdown = DEF_NUM;
        number = countdown;
    if (today.getDate() != lastDate.getDate()) {
      chrome.storage.sync.set({
        'countdown': --countdown,
        'lastOpen': new Date().toString()
      });
    }
  };

  init();
  newtabene.loadNextModule();

  return {
    init: init
  };
}(newtabene || {}));
