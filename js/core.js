var redirectDelay = 1100,
    redirectLocations = {grin: './simple.html', frown: './simple.html'},
    clickToExpression = {leftEye: 'grin', rightEye: 'frown'},
    teeth = document.getElementsByClassName('tooth'),
    firstTeeth = document.getElementsByClassName('teeth')[1],
    secondTeeth = document.getElementsByClassName('teeth')[0],
    leftEye = document.getElementById('leftEye'),
    rightEye = document.getElementById('rightEye'),
    body = document.getElementById('body'),
    bodyText = document.getElementById('body-text'),
    res = {};
leftEye.addEventListener('click', function(e) {express(e, this.id);}, false);
rightEye.addEventListener('click', function(e) {express(e, this.id, function(){
  // should open up all tabs that were opened last time
  var tabs = [];
  var i = 0;
  while (!!localStorage['tabs'+i]) {
    tabs[i] = localStorage['tabs'+i];
    console.log(tabs[i]);
    i++;
  }
});}, false);
document.onkeypress = function(e){
  if (e.which == 13) {
    console.log('innerHTML: ' + bodyText.innerHTML);
    chrome.storage.sync.set({'text': bodyText.innerHTML}, function(){});
    var text = chrome.storage.sync.get('text', function(obj){
      res = obj;
    });
    console.log(res.text + " is the text.");
  }
};
window.onload = function(){
  var text = chrome.storage.sync.get('text', function(obj){
    res = obj;
    bodyText.innerHTML = res.text;
  });
};
bodyText.addEventListener('change', function(){
  chrome.storage.sync.set({'text': bodyText.innerHTML}, function() {
    console.log('haha set');
  });
}, false);
function express(e, id, innerFunc){
  e.preventDefault();
  if (!!innerFunc) innerFunc.call();
  var expression = clickToExpression[id];
  showExpression(expression);
  redirectAfterExpression(expression);
}
function redirectAfterExpression(expression){
  setTimeout(function() {
    window.location = redirectLocations[expression];
  }, redirectDelay);
}
function showExpression(expression){
  secondTeeth.className += ' mouth';
  firstTeeth.className += ' mouth';
  for (var i = 0; i < teeth.length; i++) {
    var tooth = teeth[i];
    if (tooth.dataset.grin === 'big') tooth.className += ' big-' + tooth.dataset.side + '-' + expression + '-rotate';
    else if (tooth.dataset.grin === 'small') tooth.className += ' small-' + tooth.dataset.side + '-' + expression + '-rotate';
    else if (tooth.dataset.grin === 'tiny') tooth.className += ' tiny-' + tooth.dataset.side + '-' + expression + '-rotate';
  }
  leftEye.className += " wink";
  document.getElementsByClassName("left-eye-text")[0].className += ' fadeOut';
}
window.onbeforeunload = function(e) {
  chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      localStorage['tabs'+i] = tabs[i].url;
    }
  });
};
function processBookmarks(bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) console.log('bookmark: '+ bookmark.title + ' ~  ' + bookmark.url);
        if (bookmark.children) process_bookmark(bookmark.children);
    }
}
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('listing bookmarks: ' );
  try {
    chrome.bookmarks.getTree(processBookmarks);
  } catch (e) {
    console.log('something hapend');
  }
});
