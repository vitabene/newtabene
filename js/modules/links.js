var links = (function() {
  const NAME = 'links',
        PARENT_TYPE = 'ul',
        CHILD_TYPE = 'li',
        DEF_LINKS = [{"name":"calendar","url":"https://calendar.google.com"},
        {"name":"slack","url":"https://uncollegefellows.slack.com/messages/january_2016/"},
        {"name":"mail","url":"https://mail.google.com/mail/u/0/#inbox"},
        {"name":"mail","url":"https://mail.google.com/mail/u/0/#inbox"},
        {"name":"my site","url":"http://www.vitabenes.com"},
        {"name":"mail","url":"https://mail.google.com/mail/u/0/#inbox"},
        {"name":"github","url":"https://www.github.com"},
        {"name":"evernote","url":"https://www.evernote.com/Home.action"}];

  var parent = {};

  var init = function() {
    construct();
  };

  var construct = function(){
    var modLayer = document.createElement('div'),
        e = document.createElement(PARENT_TYPE);
    modLayer.className = "mod-layer";
    e.className = NAME;
    e.id = NAME;
    var links = newtabene.getData(NAME);
    if (typeof links === "undefined" ||  links === ""
          || Object.keys(links).length == 0) {
      links = DEF_LINKS;
      chrome.storage.sync.set({"links": links}, function() {});
    }
    // crude, should be part of links object
    for (var i = 0; i < links.length; i++) {
      constructLink(e, links[i].url, links[i].name, links[i].important);
    }
    parent = e;
    modLayer.appendChild(e);
    document.body.appendChild(modLayer);
  };

  var constructLink = function(par, url, title, isImportant) {
    var li = document.createElement('li'),
        a = document.createElement('a');
    a.href = url;
    a.innerHTML = title;
    if (isImportant) a.className += " important";
    li.appendChild(a);
    par.appendChild(li);
  }

  var getParent = function() {
    return parent;
  };

  init();
  newtabene.loadNextModule();

  return {
    getParent: getParent
  };
}(newtabene || {}));
