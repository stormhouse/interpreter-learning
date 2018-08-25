import test from 'ava';
import { lpe } from '../src/index'
test('literal', t => {
  //t.deepEqual([1], [1])
  t.deepEqual(lpe(`var aa = 111
  var baz = function (a, b) {
    var aa = 222
    1 + 2
    aa
  }
  aa
  baz()`), [111, 222])
})
