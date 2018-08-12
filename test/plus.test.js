import test from 'ava';
import { e } from '../src/index'
test('plus', t => {
  t.deepEqual(e(`1 + 2`), [3])
  t.notDeepEqual(e(`1 + 3`), [3])
})