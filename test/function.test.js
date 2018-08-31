import test from 'ava';
import { lpe } from '../src/index'
test('function: same variable in different scope', t => {
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

