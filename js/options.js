var linkNumber = {},
    linkValue = {},
    inputField = {};
function getLinks() {
  chrome.storage.sync.get("links", function(obj){
    inputField.value = obj.links[linkNumber.value];
  });
}
document.getElementById('submitInput').addEventListener("click", function(e){
  chrome.storage.sync.get("links", function(obj){
    var links = obj.links;
        links[linkNumber.value] = inputField.value;
    chrome.storage.sync.set({"links": links});
  });
});
window.onload = function() {
  linkNumber = document.getElementById('linkNumber');
  inputField = document.getElementById('inputField');
  getLinks();
  linkNumber.addEventListener("change", getLinks);
};
