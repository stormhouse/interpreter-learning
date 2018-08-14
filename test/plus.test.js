import test from 'ava';
import { lpe } from '../src/index'
test('literal', t => {
  t.deepEqual(lpe(`1`), [1])
  t.deepEqual(lpe(`-1`), [-1])
  t.deepEqual(lpe(`+1`), [1])
})
test('arithmetic', t => {
  t.deepEqual(lpe(`1 + 2`), [3])
  t.deepEqual(lpe(`-1 + 2`), [1])
  t.deepEqual(lpe(`-1 * 2`), [-2])
  t.deepEqual(lpe(`-1 * -2`), [2])
  t.deepEqual(lpe(`1 / -2`), [-0.5])
  t.deepEqual(lpe(`-1 / -2`), [0.5])
})
test('优先级', t => {
  t.deepEqual(lpe(`1 * 2 + 3`), [5])
  t.deepEqual(lpe(`1 + 2 * 3`), [7])
  t.deepEqual(lpe(`(1 + 2) * 3`), [9])
  t.deepEqual(lpe(`(1 + 2) * -3`), [-9])
})
test('error', t => {
  const error = t.throws(() => lpe(`(1 + 2 * 3`), SyntaxError)
  t.is(error.message, 'SyntaxError: require ")"')
})