function process_bookmark(bookmarks) {
    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
          console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
        }
        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("listing bookmarks: " );
  try {
    chrome.bookmarks.getTree( process_bookmark );
  } catch (e) {
    console.log('something hapend');
  }
});
var teeth = document.getElementsByClassName('tooth');
var bigGrinTeeth = [];
document.getElementById('leftEye').addEventListener('click', function(e) {
  e.preventDefault();
  console.log("invoked");
  document.getElementsByClassName('teeth')[0].className += " mouth";
  document.getElementsByClassName('teeth')[1].className += " mouth";

  for (var i = 0; i < teeth.length; i++) {
    if (teeth[i].dataset.grin === "1") teeth[i].className += " small-grin";
    else if (teeth[i].dataset.grin === "0") teeth[i].className += " big-grin";
    else teeth[i].className += " no-grin";
  }
  setTimeout(function() {
    window.location = "http://localhost:8080";
    var re = /\sbig-grin|\ssmall-grin|\sno-grin/;
    for (var i = 0; i < teeth.length; i++) {
      teeth[i].className = teeth[i].className.replace(re, "");
    }
    document.getElementsByClassName('teeth')[1].className = document.getElementsByClassName('teeth')[1].className.replace(/\smouth/, '');
    document.getElementsByClassName('teeth')[0].className = document.getElementsByClassName('teeth')[0].className.replace(/\smouth/, '');
  }, 1200);
}, false);
