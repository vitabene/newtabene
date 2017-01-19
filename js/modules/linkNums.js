var linkNums = (function(newtabene, links) {
  const NAME = 'link-numbers',
        STORAGE_KEY = 'addresses',
        ELEMENT_TYPE = 'span',
        DEPENDENCIES = 'links',
        CLASS = 'linkNums';

  var linkParent = {},
      addresses = [];

  var init = function() {
    construct();
    newtabene.registerChangeKey("lastOpen", onChanged);
    addHandlers();
    newtabene.loadNextModule();
  };

  var construct = function(){
    linkParent = links.getParent(),
    addresses = newtabene.getData(STORAGE_KEY);
    if (addresses == undefined) {
      addresses = [];
      onChanged();
    }
    for (var i = 0; i < linkParent.children.length; i++) {
      var span = document.createElement(ELEMENT_TYPE);
      span.className = CLASS;
      if (addresses == undefined) return;
      var el = linkParent.children[i];
      var address = addresses[el.firstChild.href];
      if (address == undefined) address = 0;
      span.innerHTML = address;
      el.appendChild(span);
    }
  };

  var addHandlers = function() {
    linkParent.addEventListener("click", function(e) {
      e.preventDefault();
      address = e.target.href;
      if (typeof addresses[address] === "undefined") addresses[address] = 0;
      addresses[address]++;
      e.target.nextSibling.innerHTML = addresses[address];
      chrome.storage.sync.set({"addresses": addresses}, function(obj){
        window.location = address;
      });
    }, false);
  };

  var onChanged = function(){
    chrome.storage.sync.set({"addresses": {}}, function(obj){
      window.location = window.location.href;
    });
  };

  init();
  // newtabene.loadNextModule();

  return {
    init: init
  };
}(newtabene || {}, links || {}));
