var linkNumber = {},
    linkValue = {},
    linkName = {},
    linkUrl = {},
    linkImportant = {};
function getLinks() {
  chrome.storage.sync.get("links", function(obj){
    linkUrl.value = obj.links[linkNumber.value].url;
    linkName.value = obj.links[linkNumber.value].name;
    linkImportant.checked = obj.links[linkNumber.value].important;
  });
}
document.getElementById('saveButton').addEventListener("click", function(e){
  chrome.storage.sync.get("links", function(obj){
    var links = obj.links;
        links[linkNumber.value].url = linkUrl.value,
        links[linkNumber.value].name = linkName.value;
        links[linkNumber.value].important = linkImportant.checked;
    chrome.storage.sync.set({"links": links});
  });
});
document.getElementById('prev').addEventListener('click', function(e){
  if (linkNumber.value >= 1) linkNumber.value = --linkNumber.value;
  getLinks();
});
document.getElementById('next').addEventListener('click', function(e){
  if (linkNumber.value <= 6) linkNumber.value = ++linkNumber.value;
  getLinks();
});
window.onload = function() {
  linkNumber = document.getElementById('linkNumber');
  linkUrl = document.getElementById('linkUrl');
  linkName = document.getElementById('linkName');
  linkImportant = document.getElementById('important');
  getLinks();
  linkNumber.addEventListener("change", getLinks);
};
