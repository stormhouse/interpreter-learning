from pydub import AudioSegment
import yaml
import os

YAML_FILE = '中级篇046.yaml'

def getMillisecond(str):
  if isinstance(str, int):
    return str * 1000
  l = str.split(',')
  hms = l[0]
  ms = 0
  if len(l) > 1:
    ms = int(l[1])
  hmsList = hms.split(':')
  while len(hmsList) < 3:
    hmsList.insert(0, 0)

  h = int(hmsList[0])
  m = int(hmsList[1])
  s = int(hmsList[2])
  return (h * 3600 + m * 60 + s) * 1000 + ms

secondOfSilence = AudioSegment.silent(duration=1000)

f = open(YAML_FILE, encoding="utf-8")
x = yaml.load(f)

ranges = x['ranges']
fragTimes = []
result = None
s = AudioSegment.from_file('./' + x['chapter'])
filename = x['chapter']
index = 1
for startEnd in ranges:
  start = startEnd['start']
  end = startEnd['end']
  msStart = getMillisecond(start)
  msEnd = getMillisecond(end)
  r = s[msStart:msEnd]
  newFilename = './temp/' + filename + str(index) + '.mp3'
  if os.path.exists( newFilename):
    os.remove(newFilename)
  r.export(newFilename, format="mp3", bitrate="64k")
  index = index + 1
  if result is None:
    result = r
  else:
    result += secondOfSilence
    result += r
result.export('./mp3/' + filename[:-4] + '.mp3', format='mp3', bitrate='64k')
