var links = (function() {
  const NAME = 'links',
        PARENT_TYPE = 'ul',
        CHILD_TYPE = 'li',
        DEF_LINKS = [
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
          {
            "name":"mail",
            "url": "https://mail.google.com/mail/u/0/#inbox"
          },
        ];

  var parent = {};

  var init = function() {
    construct();
  };

  var construct = function(){
    var e = document.createElement(PARENT_TYPE);
    e.className = NAME;
    e.id = NAME;
    var links = newtabene.getData(NAME);
    if (typeof links === "undefined") {
      links = DEF_LINKS;
    }
    // crude, should be part of links object
    for (var i = 0; i < links.length; i++) {
      constructLink(e, links[i].url, links[i].name);
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
  newtabene.loadNextPlugin();

  return {
    getParent: getParent
  };
}(newtabene || {}));
