function foo (n) {
  while (n < 100) {
    if (n == 3) {
      return n;
    }
    print(n);
    n = n + 1;
  }
}
var rrr = foo(1);
print('rrr:');
print(rrr);
