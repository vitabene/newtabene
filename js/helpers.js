var data = "";
var simpleSet = function(obj) {
  chrome.storage.sync.set(obj);
};
var setData = function(d){
  data = d;
}
var simpleGet = function(varname) {
  var text = chrome.storage.sync.get(varname, function(obj){
    console.log(obj);
    setData(obj.text);
  });
};
