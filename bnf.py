from pyparsing import OneOrMore
from pyparsing import Word
import pyparsing
from string  import ascii_lowercase
import string

# upper = Word(string.ascii_uppercase, exact=1)
upper = string.ascii_lowercase.upper()

dot = Word('.?!', exact=1)
lowers = Word(ascii_lowercase)

# wordStart = upper + lowers
wordStart = Word(upper, string.ascii_lowercase)
print(wordStart.parseString('H'))
print(wordStart.parseString('Ha'))


body = OneOrMore(lowers)
sentence = wordStart + body + dot
print(sentence.parseString('H a b!'))
print(sentence.parseString('Hoo a b!'))
print(sentence.parseString('Hoo a b?'))
# print(word.parseString('hello'))
# print(word.parseString('Hello'))

# print(sentence.parseString('hello world')) print(sentence.parseString('Hello     world'))
