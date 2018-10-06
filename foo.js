class Foo {}
class Bar {}
var foo = new Foo();
var bar = new Bar();
bar.n = 123;
foo.bar = bar;
print(foo.bar.n);