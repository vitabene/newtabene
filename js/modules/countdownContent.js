var countdown = {};

function getCountdown() {
  chrome.storage.sync.get("countdown", function(obj){
    countdown.value = obj.countdown;
  });
}

document.getElementById('saveButton').addEventListener("click", function(e){
  chrome.storage.sync.get("countdown", function(obj){
    var c = countdown.value;
    chrome.storage.sync.set({"countdown": c});
  });
});

window.onload = function() {
  countdown = document.getElementById('countdown');
  getCountdown();
};
