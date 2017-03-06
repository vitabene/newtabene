// ******************** variables ********************
// davidrs.github.io/vr-dataviz/client/index.html
var styles = "", style = "", theme = "", element = "",
    saveButton = document.getElementById('saveButton'),
    styleParent = document.getElementById('styleParent'),
    inputField = document.getElementById('inputField'),
    settingsParent = document.getElementById('settingsParent'),
    elementParent = document.getElementById('elementParent'),
    selectedElementField = document.getElementById('selectedElementField');

var AVAILABLE_EXTENSIONS = ["links", "notes", "linkNums", "countdown", "quote"];

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
        // if (vals[i] !== "normal") {
        var str = vals[i] + ":" + ruleArr[vals[i]]+";";
        cssStr += str;
        // }
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
      field.placeholder = "not set";
    }
  }
};
// ******************** event handlers ********************
window.onload = function() {
  chrome.storage.sync.get("activePlugins", function(obj){
    var ACTIVE_PLUGINS = obj['activePlugins'];
    // links
    // {
      // "numFields":1,

    // }
    // load the available extension
    // temporary solution
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

// var saveImage = function(){
//   var file    = document.querySelector('input[type=file]').files[0];
//   var reader  = new FileReader();
//
//   reader.onloadend = function () {
//     // set src of bg
//     // preview.src = reader.result;
//   }
//
//   if (file) {
//     // reader.readAsDataURL(file);
//   } else {
//     // preview.src = "";
//   }
// };

var save = function(){
  // set when installing to ""
  // localStorage.styleChanges += styleParent.value + ",";
  chrome.storage.sync.get("theme", function(obj){
    // theme is the actual theme object used
    var theme = obj["theme"];
    var aI = document.getElementsByClassName("style-input");
    for (var i = 0; i < aI.length; i++) {
      var field = aI[i];
      var rule = field.name;
      // if (field.value != styles[rule]) console.log(selectedElementField.value, rule, field.value);
      // if (field.value != styles[rule] && field.value != "") {
      if (field.value != "") {
        styles[rule] = field.value;
        var selEl = "." + selectedElementField.value;
        if (theme[selEl] === undefined) theme[selEl] = {}
        if (theme[selEl][rule] === undefined) theme[selEl][rule] = "";
        // applyThemeChange(selectedElementField.value, rule, field.value);
        theme[selEl][rule] = field.value;
        if (rule == "background-color" || rule == "color") {
          if (field.value.indexOf("#") === -1) theme[selEl][rule] = "#" + field.value;
        }
        if (rule == "margin") {
          if (field.value == "0") {
            // reseting side margins
            theme[selEl]["margin-right"] = 0;
            theme[selEl]["margin-left"] = 0;
          } else if (field.value == "auto") {
            theme[selEl]["margin-right"] = "auto";
            theme[selEl]["margin-left"] = "auto";
          }
        }
      }
    }
    chrome.storage.sync.set({"theme": theme}, function() {
      applyTheme();
    });
  });
};
function slideLeftToElements() {
  var elementSelect = document.getElementById('elementSelect'),
      styleSelect = document.getElementById('styleSelect');
  elementSelect.className = elementSelect.className.replace(" slide-left", " slide-from-left");
  setTimeout(function(){
    elementSelect.className = elementSelect.className.replace(" slide-from-left", " ");
  });
  styleSelect.className = styleSelect.className.replace(" slide-from-right", " slide-right");
  var aC = document.getElementsByClassName('active-controls')[0];
  aC.className = aC.className.replace(" active-controls", " ");
}

function slideRightToStyles(id) {
  var elementSelect = document.getElementById('elementSelect'),
      styleSelect = document.getElementById('styleSelect');
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

function activateModule(moduleName){
  chrome.storage.sync.get("activePlugins", function(obj){
    var ar = obj['activePlugins'];
    ar.push(moduleName);
    // get which
    chrome.storage.sync.set({"activePlugins": ar}, function() {});
  });
}

function deactivateModule(moduleName){
  chrome.storage.sync.get("activePlugins", function(obj){
    var ar = obj['activePlugins'];
    var ind = ar.indexOf(moduleName);
    ar.splice(ind, 1);
    chrome.storage.sync.set({"activePlugins": ar}, function() {});
  });
}

function showActiveControls(styleType){
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
}
function switchTabs(target) {
  var aT = document.getElementsByClassName("tab");
  for (var i = 0; i < aT.length; i++) {
    var c = document.getElementById(aT[i].id + "Content");
    if (aT[i] != target) {
      aT[i].className = aT[i].className.replace("active", "");
      c.className = c.className.replace("active", "");
    } else {
      aT[i].className = aT[i].className + " active";
      c.className = c.className + " active";
    }
  }
}
function arrowMove(arrowId) {
  var f = {},
      v = 0;
  switch (arrowId) {
    case "arrowUp":
      f = document.getElementById('marginTop');
      v = f.value;
      if (v == "") f.value = "0";
      else {
        v = v.replace(/\r?\n|\%|\r/g, '');
        v = parseInt(v) - 20;
      }
      break;
    case "arrowLeft":
      f = document.getElementById('marginLeft');
      v = f.value;
      if (v == "") f.value = "0";
      else {
        v = v.replace(/\r?\n|\%|\r/g, '');
        v = parseInt(v) - 20;
      }
      break;
    case "arrowRight":
      f = document.getElementById('marginLeft');
      v = f.value;
      if (v == "") f.value = "20px";
      else {
        v = v.replace(/\r?\n|\%|\r/g, '');
        v = parseInt(v) + 20;
      }
      break;
    case "arrowDown":
      f = document.getElementById('marginTop');
      v = f.value;
      if (v == "") f.value = "20px";
      else {
        v = v.replace(/\r?\n|\%|\r/g, '');
        v = parseInt(v) + 20;
      }
      break;
  }
  f.value = v + "px";
  save();
}
function loadModuleContent(url) {
  var elementSelect = document.getElementById('selectedElementField');
  try {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status!=404) window.location = url;
    // document.getElementById('contentFrame').src = urlLink;
  } catch (e) {
    console.log(e);
    var el = document.getElementById('contentLink');
    el.children[0].style.background = "red";
    setTimeout(function(){
      el.children[0].style.background = "white";
    }, 200);
  }
}
function resetMargin() {
  var pos = document.getElementById('position'),
      top = document.getElementById('top'),
      bottom = document.getElementById('bottom'),
      left = document.getElementById('left'),
      right = document.getElementById('right'),
      center = document.getElementById('center'),
      margin = document.getElementById('margin');

  bottom.value = "none";
  top.value = "none";
  left.value = "none";
  right.value = "none";
  margin.value = "0";

  var marginTop = document.getElementById('marginTop'),
      marginLeft = document.getElementById('marginLeft'),
      marginBottom = document.getElementById('marginBottom'),
      marginRight = document.getElementById('marginRight');

  marginTop.value = "0";
  marginLeft.value = "0";
  marginBottom.value = "0";
  marginRight.value = "0";

  pos.value = "static";
  saveButton.click();
}
document.addEventListener('click', function(e){
  var t = e.target,
      id = e.target.id;
  if (t.parentNode.className == "element" && t.type != "checkbox") {
    // if element is selected
    t = t.parentNode;
    id = t.id;
  } else if (t.type == "checkbox") {
    //if checkbox is clicked
    var prev = t.previousElementSibling;
    if (prev.dataset.plugin == undefined) return;
    var mod = prev.dataset.plugin;
    if (t.checked) {
      // push to activePlugins
      activateModule(mod);
    } else {
      // splice from to activePlugins
      deactivateModule(mod);
    }
  }
  // switch between sliding
  if (t.className.indexOf("element") !== -1) {
    selectedElementField.value = id.replace(".","");
    slideRightToStyles(id);
  } else if (t.className.indexOf("tab") !== -1) {
    switchTabs(t);
  } else if (t.className.indexOf("arrow") !== -1) {
    arrowMove(t.id);
  }

  // if (t.className == "style") {
    // var styleType = t.dataset.ctrls;
    // showActiveControls(styleType);
  // }

  if (id == "saveButton") {
    save();
  } else if (id == "elementBackButton") {
    slideLeftToElements();
  }
  if (t.id == "resetMarginButton") {
    resetMargin();
  }
  if (t.id == "contentLink" || t.parentNode.id == "contentLink") {
    e.preventDefault();
    var urlLink =  "./" + selectedElementField.value + ".html";
    loadModuleContent(urlLink);
  }
  // back to element choice
  if (t.dataset.stick != "") {
    var ptr = t.parentNode;
    stickTo(ptr.dataset.row, t.dataset.stick)
  }
  // loading settings
  // if (t.type === "checkbox") {
  //   var elementNode = t.parentNode;
  //   // console.log(elementNode, t);
  //   chrome.storage.sync.get("settings", function(obj){
  //     var settings = obj.settings,
  //         setting = settings[elementNode.id];
  //     if (typeof setting != "object") setting = {};
  //     setting["active"] = t.checked;
  //     settings[elementNode.id] = setting;
  //     chrome.storage.sync.set({"settings": settings});
  //   });
  //   // another object - settings
  //   // chrome.storage.sync.set({elementNode.id: t.checked}, function() {});
  // }



}, false);

// never called, html commented out
function stickTo(ver, hor) {
  var pos = document.getElementById('position'),
      top = document.getElementById('top'),
      bottom = document.getElementById('bottom'),
      left = document.getElementById('left'),
      right = document.getElementById('right'),
      center = document.getElementById('center'),
      margin = document.getElementById('margin');

  pos.value = "absolute";

  if (ver == "top") {
    top.value = 0;
    bottom.value = "none";
  }
  if (ver == "bottom") {
    bottom.value = 0;
    top.value = "none";
  }
  if (hor == "left") {
    left.value = 0;
    right.value = "none";
  }
  if (hor == "center") left.value = "48%";
  if (hor == "right") {
    right.value = 0;
    left.value = "none";
  }
  margin.value = 0;
  //
  save();
}

document.onkeydown = function(e){
  // up = 38, down = 40
  if (e.keyCode == 13) save();
}
