var countdown = (function() {
  var elementType = 'span',
      classStr = 'countdown',
      idStr = 'countdown',
      storageStr = 'countdown';

  var init = function() {
    checkLastOpen();
    construct();
  };

  var construct = function(){
    var e = document.createElement(elementType);
    e.className = classStr;
    e.id = idStr;
    e.innerHTML = newtabene.getData(storageStr);
    document.body.appendChild(e);
  };

  var checkLastOpen = function() {
    // crude
    var lastDate = new Date(newtabene.getData("lastOpen")),
        today = new Date(),
        countdown = newtabene.getData(storageStr);
    if (today.getDate() != lastDate.getDate()) {
      chrome.storage.sync.set({
        storageStr: --countdown,
        "lastOpen": new Date().toString()
      });
    }
  };

  init();

  return {
    init: init
  };
}(newtabene || {}));
