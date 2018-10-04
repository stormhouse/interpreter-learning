var a = 'global';
{
  function showA () {
    print(a);
  }
  showA();
  var a = 'local';
  showA();
}

function makeCounter () {
  var i = 0;
  function count () {
    i = i + 1;
    print(i);
  }
  return count;
}
var counter = makeCounter();
counter();
counter();
counter();
