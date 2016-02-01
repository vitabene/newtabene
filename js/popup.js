// ******************** variables ********************
var styles = "", style = "", theme = "", element = "",
    saveButton = document.getElementById('saveButton'),
    styleParent = document.getElementById('styleParent'),
    inputField = document.getElementById('inputField'),
    settingsParent = document.getElementById('settingsParent'),
    elementParent = document.getElementById('elementParent'),
    selectedElementField = document.getElementById('selectedElementField');

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
      cssStr += "#newtab " + rules[rule] + " {";
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
  console.log(element, style, change);
  chrome.storage.sync.get("theme", function(obj){
    // theme is the actual theme object used
    var theme = obj["theme"];
    if (theme[element] === undefined) theme[element] = {}
    if (theme[element][style] === undefined) theme[element][style] = "";
    theme[element][style] = change;
    chrome.storage.sync.set({"theme": theme}, function() {
      applyTheme();
    });
  });
};
var cleanInputs = function() {
  var aI = document.getElementsByClassName("style-input");
  for (var l = 0; l < aI.length; l++) {
    var field = aI[l];
    field.value = "";
  }
};
var loadToInputs = function(id) {
  if (styles == undefined) return;
  var aI = document.getElementsByClassName("style-input");
  // get customizable attributes
  var inputNames = [];
  for (i = 0; i < aI.length; i++) {
    var field = aI[i];
    inputNames.push(field.name);
  }
  // load default
  var sts = document.styleSheets;
  for (var i = 0; i < sts.length; i++) {
    var ruleList = sts[i].cssRules;
    for (var j = 0; j < ruleList.length; j++) {
      var rule = ruleList[j];
      if (rule.selectorText == "#newtab " + id) {
        for (var k = 0; k < inputNames.length; k++) {
          var styleValue = rule['style'][inputNames[k]];
          if (styleValue != "") {
            var field = aI[k];
            // console.log(styleValue);
            field.value = styleValue;
          }
        }
      }
    }
  }
  // replace with custom styles
  for (i = 0; i < aI.length; i++) {
    var field = aI[i];
    var rule = field.name;
    if (styles[rule] != undefined) {
      field.value = styles[rule];
    }
    if (field.value == "") {
      // if input field
      field.placeholder = "no style set yet";
    }
  }
};
// ******************** event handlers ********************
window.onload = function() {
  chrome.storage.sync.get("activePlugins", function(obj){
    var ACTIVE_PLUGINS = obj['activePlugins'];
    // load the available extension
    // temporary solution
    var AVAILABLE_EXTENSIONS = ["links", "notes", "linkNums", "countdown", "quote"];
    // ext settings needed
    // append to elementParent
    // this needed to construct
    // <li class="element" id=".links"><span data-plugin="links">link</span><input type="checkbox"></li>
    // li, span, input
    for (var i = 0; i < AVAILABLE_EXTENSIONS.length; i++) {
      var ext = AVAILABLE_EXTENSIONS[i];
      var li = document.createElement('li'),
          span = document.createElement('span'),
          input = document.createElement('input');
      // clumsy
      li.className = 'element';
      li.id = "." + ext;
      span.innerHTML = ext;
      span.dataset.plugin = ext;
      input.type = "checkbox";
      if (ACTIVE_PLUGINS.indexOf(ext) !== -1) input.checked = true;
      li.appendChild(span);
      li.appendChild(input);
      elementParent.appendChild(li);
    }
  });
};

document.addEventListener('click', function(e){
  var t = e.target,
      id = e.target.id;
  // if span inside li is clicked
  console.log(t.type);
  if (t.parentNode.className == "element" && t.type != "checkbox") {
    t = t.parentNode;
    id = t.id;
  } else if (t.type == "checkbox") {
    console.log(t.checked);
    if (t.checked) {
      // activated
      // push to activePlugins
      chrome.storage.sync.get("activePlugins", function(obj){
        var ar = obj['activePlugins'];
        // get which
        var prev = t.previousElementSibling;
        if (prev.dataset.plugin == undefined) return;
        /*ar = */ ar.push(prev.dataset.plugin);
        // console.log(ar);
        chrome.storage.sync.set({"activePlugins": ar}, function() {});
      });
    } else {
      // deactivated
      // splice from to activePlugins
      chrome.storage.sync.get("activePlugins", function(obj){
        var ar = obj['activePlugins'];
        var prev = t.previousElementSibling;
        if (prev.dataset.plugin == undefined) return;

        // not sure about the following line, employing a clumsy filter
        ar = ar.splice(ar.indexOf(prev.dataset.plugin));
        for (var i = 0; i < ar.length; i++) {
          if (ar[i] === prev.dataset.plugin) {
            // ar[i] = "";
          }
        }
        // console.log(ar);
        chrome.storage.sync.set({"activePlugins": ar}, function() {});
      });
    }
  }
  // switch between sliding
  if (t.className.indexOf("element") !== -1) {
    selectedElementField.value = id;
    var elementSelect = document.getElementById('elementSelect');
    var styleSelect = document.getElementById('styleSelect');
    // load theme
    chrome.storage.sync.get("theme", function(obj){
      var theme = obj["theme"];
      var themeKeys = Object.keys(theme);
      if (themeKeys.indexOf(id) !== -1) styles = theme[id];
      cleanInputs();
      loadToInputs(id);
    });

    // UI effect
    elementSelect.className += " slide-left";
    styleSelect.className += " slide-from-right";
  }

  if (t.className == "style") {
    var styleType = t.dataset.ctrls;
    var activeControls = document.getElementById(styleType);
    var aC = document.getElementsByClassName("style-controls");
    for (var i = 0; i < aC.length; i++) {
      if (aC[i] != activeControls) {
        aC[i].className = aC[i].className.replace("active-controls", "");
      } else {
        if (aC[i].className.indexOf('active-controls') !== -1) {
          aC[i].className = aC[i].className.replace("active-controls", "");
        } else {
          aC[i].className = aC[i].className + " active-controls";
        }
      }
    }
    // sliding
    saveButton.style.display = "block";
  }

  if (id == "saveButton") {
    // set when installing to ""
    // localStorage.styleChanges += styleParent.value + ",";
    var aI = document.getElementsByClassName("style-input");
    for (var i = 0; i < aI.length; i++) {
      var field = aI[i];
      var rule = field.name;
      // if (field.value != styles[rule]) console.log(selectedElementField.value, rule, field.value);
      if (field.value != styles[rule]) {
        styles[rule] = field.value;
        applyThemeChange(selectedElementField.value, rule, field.value);
      }
    }
  }

  // closing button
  if (id == "elementCloseButton") window.close();

  // back to element choice
  if (id == "elementBackButton") {
    var elementSelect = document.getElementById('elementSelect');
    var styleSelect = document.getElementById('styleSelect');
    elementSelect.className = elementSelect.className.replace(" slide-left", " slide-from-left");
    styleSelect.className = styleSelect.className.replace(" slide-from-right", " slide-right");
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

  // tabs switching
  if (t.className.indexOf("tab") !== -1) {
    var aT = document.getElementsByClassName("tab");
    for (var i = 0; i < aT.length; i++) {
      var c = document.getElementById(aT[i].id + "Content");
      if (aT[i] != t) {
        aT[i].className = aT[i].className.replace("active", "");
        c.className = c.className.replace("active", "");
      } else {
        aT[i].className = aT[i].className + " active";
        c.className = c.className + " active";
      }
    }
  }
}, false);
