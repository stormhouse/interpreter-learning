import test from 'ava';
import { lpe } from '../src/index'
test(`assign------------------------------>
  var foo
  foo`,
t => {
  t.deepEqual(lpe(`var foo
  foo
  `), [undefined])
})
test(`assign------------------------------>
  var foo = 1
  foo`,
t => {
  t.deepEqual(lpe(`var foo = 1
  foo`), [1])
})
test(`assign------------------------------>
  var foo = 1
  var bar = 2
  foo
  bar`,
t => {
  t.deepEqual(lpe(`var foo = 1
  var bar = 2
  foo
  bar`), [1, 2])
})
test(`assign------------------------------>
  var foo, bar
  foo
  bar`,
t => {
  t.deepEqual(lpe(`var foo, bar
  foo
  bar`), [undefined, undefined])
})
test(`assign------------------------------>
  var foo, bar = 2
  foo
  bar`,
t => {
  t.deepEqual(lpe(`var foo, bar = 2
  foo
  bar`), [undefined, 2])
})
test(`assign------------------------------>
  var foo = 1, bar = 2
  foo
  bar`,
t => {
  t.deepEqual(lpe(`var foo = 1, bar = 2
  foo
  bar`), [1, 2])
})
