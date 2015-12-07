// widget__element -> styles
// sample theme object
//
function createStyle() {
  var style = document.createElement('style');
  style.type = 'text/css';
  return style;
}
function appendStyle(style) {
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
}
function writeRule(stylesheet, ruleText) {
// var css = 'h1 { background: red; }',
// if (style.styleSheet){
//   style.styleSheet.cssText = css;
// } else {
//   style.appendChild(document.createTextNode(css));
// }
}
{
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
