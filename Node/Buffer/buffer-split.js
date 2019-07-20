// [1,2,3,2,5,2]
// current 0 -> 1 -> 3 -> 5
function bufferSplit (buf, splitBuf) {
  let pos = 0 // 寻找到的位置
  let current = 0 // 初始寻找位置
  let result = []
  const len = splitBuf.length
  while ((pos = buf.indexOf(splitBuf, current)) > -1) {
    result.push(buf.slice(current, pos))
    current = pos + len // 找到后，更新开始寻找的位置
  }
  result.push(buf.slice(current))
  return result
}

// [1,2,3,2,5,2] -> [3,2,5,2] -> [5,2] -> []
function bufferSplit2 (buf, splitBuf) {
  var search = -1
  var lines = []

  while ((search = buf.indexOf(splitBuf)) > -1) {
    lines.push(buf.slice(0, search))
    buf = buf.slice(search + splitBuf.length, buf.length)
  }

  lines.push(buf)
  return lines
}

function bufferSplit3 (str, splitStr) {
  const buf = Buffer.from(str)
  const splitBuf = Buffer.from(splitStr)
  return bufferSplit(buf, splitBuf)
}

const buf = Buffer.from('我是哈哈我是我是老司机')
const splitBuf = Buffer.from('我是')
const result = bufferSplit(buf, splitBuf)
console.log(result.toString())
