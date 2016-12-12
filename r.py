import re

# http://blog.csdn.net/goodboy5201314/article/details/42642149

p = re.compile(r'(([a-z]*)|(=)|([0-9]+))')
str = 'foo = 123'
m = p.match(str)
print(m.span())
print(m.groupdict())
print(m.group())
