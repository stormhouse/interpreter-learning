import test from 'ava';
import { lpe } from '../src/index'
test(`function parameter ----------------
  var bar = function (a, b) {
    a
  }
  bar(1)`,
t => {
  t.deepEqual(lpe(`var bar = function (a, b) {
    a
  }
  bar(1)`), [1])
})
test(`function parameter ----------------
  var bar = function (a, b) {
    a + b
  }
  bar(1 + 2, 3 * 4)`,
t => {
  t.deepEqual(lpe(`var bar = function (a, b) {
    a + b
  }
  bar(1 + 2, 3 * 4)`), [15])
})
test(`function: same variable in different scope----------------
  var aa = 111
  var baz = function (a, b) {
    var aa = 222
    1 + 2
    aa
  }
  aa
  baz()`,
t => {
  t.deepEqual(lpe(`var aa = 111
  var baz = function (a, b) {
    var aa = 222
    1 + 2
    aa
  }
  aa
  baz()`), [111, 222])
})
test('function: variable search in parent context', t => {
  t.deepEqual(lpe(`var aa = 111
  var baz = function (a, b) {
    1 + 2
    aa
  }
  aa
  baz()`), [111, 111])
})
test(`function: actual parameter is a variable------------------
  var aa = 111
  var bb = 222
  var baz = function (a, b) {
    a + b
  }
  baz(aa, bb)`, t => {
  t.deepEqual(lpe(`var aa = 111
  var bb = 222
  var baz = function (a, b) {
    a + b
  }
  baz(aa, bb)`), [333])
})
/*
test(`function: closure------------------
  var foo = function () {
    var a = 1
    var b = function () {
      a
    }
    b
  }
  var z = foo()
  z()
`, t => {
  t.deepEqual(lpe(`var foo = function () {
    var a = 1
    var b = function () {
      a
    }
    b
  }
  var z = foo()
  z()`), [333])
})
*/
