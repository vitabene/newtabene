var links = (function() {
  var parentType = 'ul',
      childType = 'li',
      classStr = 'links',
      idStr = 'links',
      storageStr = 'links',
      parent = {};

  var init = function() {
    construct();
  };

  var construct = function(){
    var e = document.createElement(parentType);
    e.className = classStr;
    e.id = idStr;
    var links = newtabene.getData(storageStr);
    // crude, should be part of links object
    var linkTitles = newtabene.getData('linkTitles');
    for (var i = 0; i < links.length; i++) {
      constructLink(e, links[i], linkTitles[i]);
    }
    parent = e;
    document.body.appendChild(e);
  };

  var constructLink = function(par, url, title) {
    var li = document.createElement('li'),
        a = document.createElement('a');
    a.href = url;
    a.innerHTML = title;
    li.appendChild(a);
    par.appendChild(li);
  }

  var getParent = function() {
    return parent;
  };

  init();

  return {
    getParent: getParent
  };
}(newtabene || {}));
