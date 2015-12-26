var styles = "",
    style = "",
    input = "",
    theme = "",
    element = "",
    saveButton = document.getElementById('saveButton'),
    styleParent = document.getElementById('styleParent'),
    inputField = document.getElementById('inputField'),
    settingsParent = document.getElementById('settingsParent'),
    elementParent = document.getElementById('elementParent'),
    action = [];

var themes = {
  "default": {
    "body": {
      "background-color": "rgb(6, 14, 38)",
      "color": "rgb(242, 221, 159)",
      "font-family": "King"
    },
    ".notes": {
      // not today
      // "normal" :{
        "background-color": "rgb(6, 14, 38)",
        "color": "rgb(242, 221, 159)",
        "font-family": "King"
      // }
    },
    ".quote": {
      "font-family": "Colleged",
      "color": "rgb(187, 42, 77)",
      "text-shadow": "1px 1px 1px navajowhite"
    }
  }
};
document.addEventListener('click', function(e){
  var t = e.target,
      id = e.target.id;
  if (t.parentNode.parentNode.id == "elementParent") {
    element = id;
    chrome.storage.sync.get("theme", function(obj){
      var theme = obj["theme"];
      var themeKeys = Object.keys(theme);
      if (themeKeys.indexOf(id) !== -1) {
        styles = theme[id];
      }
      settingsParent.className += " show-settings";
      elementParent.style.display = "none";
    });
  }
  if (id == "saveButton") {
    applyThemeChange(element, styleParent.value, inputField.value);
  }
}, false);
styleParent.addEventListener('change', function(e) {
  style = e.target.value;
  inputField.value = styles[style];
}, false);

var applyThemeChange = function(element, style, change) {
  chrome.storage.sync.get("theme", function(obj){
    var theme = obj["theme"];
    // console.log(theme[element][style]);
    if (theme[element] === undefined) theme[element] = {}
    theme[element][style] = change;
    chrome.storage.sync.set({"theme": theme}, function() {
      applyTheme();
    });
  });
}

var getTheme = function(str) {
  return chrome.storage.sync.get(str, function(obj){
      return obj
  });
}

var applyTheme = function(){
  chrome.storage.sync.get("theme", function(obj){
    theme = obj;
    // theme = JSON.stringify(obj);
    var rules = Object.keys(theme["theme"]);
    var cssStr = "";
    for (rule in rules) {
      // var el = document.querySelectorAll(rules[rule]);
      var ruleArr = theme["theme"][rules[rule]];
      var vals = Object.keys(ruleArr);
      cssStr += rules[rule] + " {";
      for (var i = 0; i < vals.length; i++) {
        // deal with states later
        if (vals[i] !== "normal") {
          var str = vals[i] + ":" + ruleArr[vals[i]]+";";
          cssStr += str;
        }
      }
      cssStr += "}";
    }
    chrome.storage.sync.set({"activeTheme": {"str":cssStr}});
  });
};

// chrome.storage.sync.set();
// saveButton.addEventListener('click', function(){
  // save settings
  // alert(window.location.href)
  // applyTheme();
  // simpleGet('text');
// }, false);

window.onload = function(){
  // load
  // simpleGet('text');
}
