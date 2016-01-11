var linkNums = (function(newtabene, links) {
  var storageStr = "addresses",
      classStr = "link-number",
      elementType = "span";
      linkParent = {}.
      addresses = [];

  var init = function() {
    construct();
    newtabene.registerChangeKey("lastOpen", onChanged);
    addHandlers();
  };

  var construct = function(){
    linkParent = links.getParent(),
    addresses = newtabene.getData(storageStr);
    for (var i = 0; i < linkParent.children.length; i++) {
      var span = document.createElement(elementType);
      span.className = classStr;
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
      if (addresses[address] == undefined) addresses[address] = 0;
      addresses[address]++;
      e.target.nextSibling.innerHTML = addresses[address];
      chrome.storage.sync.set({'addresses': addresses}, function(obj){
        console.log('Addresses set.');
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

  return {
    init: init
  };
}(newtabene || {}, links));
