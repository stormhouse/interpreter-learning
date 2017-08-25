import collections
from random import choice

Card = collections.namedtuple('Card', ['rank', 'suit'])

c = Card('r', 's')
print(c)

class FrenchDeck:
    ranks = [str(n) for n in range(2, 11)] + list('JQKA')
    suits = 'spades diamonds clubs hearts'.split()

    def __init__(self):
        self._cards = [Card(rank, suit) for suit in self.suits for rank in self.ranks]

    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]

f = FrenchDeck()

print(len(f))
print(f[-1])
for x in f:
    print(x)
print(choice(f))
print(Card('2', 'spades') in f)
