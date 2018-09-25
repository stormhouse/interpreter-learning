import test from 'ava';
import { lpe } from '../src/index'

test(`literal: boolean------------------------------>
  true
  `,
t => {
  t.deepEqual(lpe(`true`), [true])
})
test(`literal: boolean------------------------------>
  false
  `,
t => {
  t.deepEqual(lpe(`false`), [false])
})
test(`literal: boolean------------------------------>
  var foo = true
  var bar = false
  foo
  bar`,
t => {
  t.deepEqual(lpe(
    `var foo = true
    var bar = false
    foo
    bar`
  ), [true, false])
})
