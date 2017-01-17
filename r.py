import re

# http://blog.csdn.net/goodboy5201314/article/details/42642149
regex = r'(([0-9]+)|([a-z]+)|=)'
p = re.compile(regex)
str = '''
while true {
    foo = 123
    int = '456'
}
'''

list = []
m = p.match(str)
while m:
    list.append(m.group())
    pos = m.span()[1]

    m = p.match(str, pos+1)
    print(m)

print(list)

# m2 = p.match('444 u')
# print(m2.span())
# print(m2.groups())
