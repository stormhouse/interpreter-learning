import re
p = re.compile('([0-9]+)|("(\\"|\\\\|\\n|[^"])*")|([a-zA-Z][a-zA-Z0-9]*)|(=)')
p1 = re.compile('([0-9]+)|("(\\"|\\\\|\\n|[^"])*")|([a-zA-Z][a-zA-Z0-9]*)|(=)')
print(p.search('a = 123').groups())
print(p1.search(' = 123').groups())
# print(p.match(s, 1).groups())