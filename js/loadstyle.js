function getSetStyle(themeName) {
  chrome.storage.sync.get(themeName, function(obj){
    // console.log(obj.activeTheme);
    if (obj.activeTheme != undefined) setStyle(obj.activeTheme.str);
    else setStyle("");
  });
}
function setStyle(str) {
  style = createStyle();
  style = writeRule(style, str);
  appendStyle(style);
}
function createStyle() {
  var style = document.createElement('style');
  style.type = 'text/css';
  return style;
}
function appendStyle(style) {
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
}
function writeRule(style, ruleText) {
  if (style.styleSheet)style.styleSheet.cssText = ruleText;
  else style.appendChild(document.createTextNode(ruleText));
  return style;
}
