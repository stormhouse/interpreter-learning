from os import listdir
from os.path import isfile, join

from pydub import AudioSegment
import yaml

def getMs(str):
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


# 读取文件
f = open('中级篇046.yaml', encoding="utf-8")

# 导入
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
  msStart = getMs(start)
  msEnd = getMs(end)
  r = s[msStart:msEnd]
  # result.export(filename + '_' + start + '-' + end + '.mp3', format="mp3", bitrate="64k")
  r.export(filename + str(index) + '.mp3', format="mp3", bitrate="64k")
  index = index + 1
  if result is None:
    result = r
  else:
    result += r
print(result)
result.export("all.mp3", format="mp3", bitrate="64k")
