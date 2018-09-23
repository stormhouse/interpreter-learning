var foo = 1;
var bar = 'bar';
print foo;
{
    var foo = 2;
    print foo;
    print bar;
    {
        var baz = 3;
        print baz;
    }
}
print foo;
print bar;

