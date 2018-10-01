function fibonacci (n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
var i = 1;
while (i <= 10) {
  var rrr = fibonacci(i);
  i = i + 1;
  print(rrr);
}
