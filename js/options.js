var linkNumber = {},
    linkValue = {},
    inputField = {};

function constructLink(url) {
  var li = document.createElement('li'),
      a = document.createElement('a');
  a.href = url;
  li.appendChild(a);
  document.getElementById('linkParent').appendChild(a);
}

function getLinks() {
  chrome.storage.sync.get("links", function(obj){
    // console.log(obj.links[linkNumber.value]);
    inputField.value = obj.links[linkNumber.value];
  });
}

document.getElementById('submitInput').addEventListener("click", function(){
  //
});

window.onload = function() {
  linkNumber = document.getElementById('linkNumber');
  inputField = document.getElementById('inputField');
  getLinks();
  linkNumber.addEventListener("change", getLinks);
};
