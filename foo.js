var foo = 1;
var bar = 'bar';
print bar;
bar = 'new bar';
{
    var foo = 2;
    print foo;
    print bar;
    {
        var baz = 3;
        print bar;
        bar = 'old bar';
        foo = 22;
        print foo;
    }
    print foo;
}
print bar;
print foo;

