from os import listdir
from os.path import isfile, join

from pydub import AudioSegment

mypath = './mp3/'

onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]
files = list(filter(lambda f : 'mp3' in f, onlyfiles))
result = None
for f in files:
    print(f)
    s = AudioSegment.from_mp3(mypath + f)
    if result is None:
        result = s
    else:
        result = result + s

print(result)
result.export("all.mp3", format="mp3", bitrate="64k")