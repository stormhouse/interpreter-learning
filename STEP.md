- 正则表达式 -> 词法单元
- AST基本类
- BNF
```
while i < 10 {
  sum = sum + i
  i = i + 1
}
sum
```
```
even = 0
odd = 0
i = 1
while i < 10 {
  if i % 2 == 0 { // even number?
    even = even + i
  } else {
    odd = odd + i
  }
  i = i + 1
}
even + odd
```