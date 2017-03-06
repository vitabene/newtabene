var resetModules = function() {
  chrome.storage.sync.set({"activePlugins": ["links", "notes", "linkNums", "countdown", "quote"]}, function(o){
      console.log(o)
  });
};
