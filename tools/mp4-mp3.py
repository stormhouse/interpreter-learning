from os import listdir
from os.path import isfile, join

from pydub import AudioSegment

mypath = './mp4/'

onlyfiles = sorted([ f for f in listdir(mypath) if isfile(join(mypath,f)) ])
files = list(filter(lambda f : 'mp4' in f, onlyfiles))
for f in files:
    print(f)
    s = AudioSegment.from_file(mypath + f, 'mp4')
    s.export('./mp4/' + f + '.mp3', format='mp3', bitrate='64k')
