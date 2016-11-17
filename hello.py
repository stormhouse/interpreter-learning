import re
from Token import Token

token = Token()
token.name = 'nnn'
p = re.compile('[a-z]+')
print(p.match('fff899898898ff').span())
print(token.name)
