// ******************** variables ********************
var styles = "", style = "", theme = "", element = "",
    saveButton = document.getElementById('saveButton'),
    styleParent = document.getElementById('styleParent'),
    inputField = document.getElementById('inputField'),
    settingsParent = document.getElementById('settingsParent'),
    elementParent = document.getElementById('elementParent');
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
var settingsObject = {
	"settings": {
    "body": {
      "data": ["lastOpen"]
    },
		".life-span": {
			"active": "false",
			"parentType": "span",
			"class": "life-span",
      "data": ["daysLeft"],
			"id": "life"
		},
		".link-number": {
			"active": "true",
			"elementType": "span",
      "data": ["addresses"],
			"class": "link-number",
			"id": ""
		},
		".links": {
			"active": "true",
      "data": ["links", "linkTitles"],
			"parentType": "ul",
      "elementType": "li",
			"class": "links",
			"id": "linkParent"
		},
		".notes": {
			"active": "true",
			"parentType": "span",
			"contenteditable": "true",
      "data": ["text"],
			"spellcheck": "false",
			"class": "notes",
			"id": "noteSpace"
		},
		".quote": {
			"active": "true",
			"parentType": "quote",
      "data": ["quote"],
			"class": "quote",
			"contenteditable": "true",
			"id": "quote"
		}
	}
};
// ******************** functions ********************
var applyTheme = function(){
  chrome.storage.sync.get("theme", function(obj){
    theme = obj;
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
    // activeTheme is the string version of theme used
    chrome.storage.sync.set({"activeTheme": {"str":cssStr}});
  });
};
var applyThemeChange = function(element, style, change) {
  chrome.storage.sync.get("theme", function(obj){
    // theme is the actual theme object used
    var theme = obj["theme"];
    if (theme[element] === undefined) theme[element] = {}
    theme[element][style] = change;
    chrome.storage.sync.set({"theme": theme}, function() {
      applyTheme();
    });
  });
};
// ******************** event handlers ********************
document.addEventListener('click', function(e){
  var t = e.target,
      id = e.target.id;
  if (t.parentNode.parentNode.id == "elementParent") {
    element = id;
    chrome.storage.sync.get("theme", function(obj){
      var theme = obj["theme"];
      var themeKeys = Object.keys(theme);
      if (themeKeys.indexOf(id) !== -1) styles = theme[id];
      settingsParent.className += " show-settings";
      elementParent.style.display = "none";
    });
  }
  if (id == "saveButton") {
    // set when installing to ""
    localStorage.styleChanges += styleParent.value + ",";
    applyThemeChange(element, styleParent.value, inputField.value);
  }
  if (t.type === "checkbox") {
    var elementNode = t.parentNode;
    // console.log(elementNode, t);
    chrome.storage.sync.get("settings", function(obj){
      var settings = obj.settings,
          setting = settings[elementNode.id];
      if (typeof setting != "object") setting = {};
      setting["active"] = t.checked;
      settings[elementNode.id] = setting;
      chrome.storage.sync.set({"settings": settings});
    });
    // another object - settings
    // chrome.storage.sync.set({elementNode.id: t.checked}, function() {});
  }
}, false);
styleParent.addEventListener('change', function(e) {
  style = e.target.value;
  if (styles[style] === undefined) inputField.placeholder = "no style set";
  else inputField.value = styles[style];
}, false);
