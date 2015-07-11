if (!document.getElementById('test')) {
  var test = document.createElement('div'), firstEl = document.body.childNodes[0];
  test.id = "test";
  test.contentEditable = true;
  test.className = "test";
  console.log('box injected');
  test.addEventListener('click', function(){
    console.log('works');
  });
  document.getElementsByTagName('body')[0].width = "80%";
  document.getElementsByTagName('body')[0].marginLeft = "20%";

  document.body.insertBefore(test, firstEl);
}