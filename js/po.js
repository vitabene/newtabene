// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     file: 'note.js'
//   });
// });
function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
          console.log(bookmark);
            console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
        }

        // if (bookmark.children) {
        //     process_bookmark(bookmark.children);
        // }
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("listing bookmarks: " );
  chrome.bookmarks.getTree( process_bookmark );
});
