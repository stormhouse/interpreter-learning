import test from 'ava';
import { lpe } from '../src/index'
test(`function arguments ----------------
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
test(`function arguments ----------------
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

