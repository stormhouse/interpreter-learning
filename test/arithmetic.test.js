import test from 'ava';
import { lpe } from '../src/index'
test('literal 1', t => {
  t.deepEqual(lpe(`1`), [1])
})
test('literal -1', t => {
  t.deepEqual(lpe(`-1`), [-1])
})
test('literal +1', t => {
  t.deepEqual(lpe(`+1`), [1])
})
test('arithmetic: 1 + 2', t => {
  t.deepEqual(lpe(`1 + 2`), [3])
})
test('arithmetic: -1 + 2', t => {
  t.deepEqual(lpe(`-1 + 2`), [1])
})
test('arithmetic: -1 * 2', t => {
  t.deepEqual(lpe(`-1 * 2`), [-2])
})
test('arithmetic: -1 * -2', t => {
  t.deepEqual(lpe(`-1 * -2`), [2])
})
test('arithmetic: -1 * -2', t => {
  t.deepEqual(lpe(`1 / -2`), [-0.5])
})

test('arithmetic: 1 * 2 + 3', t => {
  t.deepEqual(lpe(`1 * 2 + 3`), [5])
})
test('arithmetic: 1 + 2 * 3', t => {
  t.deepEqual(lpe(`1 + 2 * 3`), [7])
})
test('arithmetic: (1 + 2) * 3', t => {
  t.deepEqual(lpe(`(1 + 2) * 3`), [9])
})
test('arithmetic: (1 + 2) * -3', t => {
  t.deepEqual(lpe(`(1 + 2) * -3`), [-9])
})
test('error', t => {
  const error = t.throws(() => lpe(`(1 + 2 * 3`), SyntaxError)
  t.is(error.message, 'SyntaxError: require ")"')
})
