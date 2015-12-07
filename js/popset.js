var elCusted = "",
    input = "",
    theme = "",
    saveButton = document.getElementById('saveButton'),
    cS = document.getElementById('colorSquare');

var themes = {
  "default": {
    "body": {
      "background-color": "rgb(6, 14, 38)",
      "color": "rgb(242, 221, 159)",
      "font-family": "King"
    },
    ".notes": {
      "normal" :{
        "background-color": "rgb(6, 14, 38)",
        "color": "rgb(242, 221, 159)",
        "font-family": "King"
      }
    },
    ".quote": {
      "font-family": "Colleged",
      "color": "rgb(187, 42, 77)",
      "text-shadow": "1px 1px 1px navajowhite"
    }
  }
};

var applyTheme = function(){
  chrome.storage.sync.get("theme", function(obj){
    theme = obj;
    // theme = JSON.stringify(obj);
    var rules = Object.keys(theme["theme"]["default"]);
    for (rule in rules) {
      // get theme for the rule
      // get rule keys
      // loop through
        // key -> value
    }
    alert(rules.toString())
  });
  // get theme object
  // get active theme
  // get rules
  // set normal
  // set before, after
  // set states
};

// chrome.storage.sync.set();
saveButton.addEventListener('click', function(){
  // save settings
  // alert(window.location.href)
  applyTheme();
  // simpleGet('text');
}, false);

window.onload = function(){
  // load
  // simpleGet('text');
}
