const b1 = new Buffer('你')
const b2 = new Buffer('你', 'ascii')
console.log(b1, b1.toString())
console.log(b2)

var iconv = require('iconv-lite')

const buf1 = iconv.encode("你", 'utf8');
const buf2 = iconv.encode("你", 'gbk');
console.log(buf1)
console.log(buf2, iconv.decode(buf2, 'gb18030'))