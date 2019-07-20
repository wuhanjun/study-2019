const CreateReadStream = require('./CreateReadStream')
const rs = new CreateReadStream('./test/1.md', {
  flags: 'r', // 默认读取
  encoding: null, // 默认null
  fd: null, // 取拿一个文件，默认null，createReadStream自己处理得到
  mode: 0o666, // 默认值可读可写不可操作
  autoClose: true, // 默认 ture，读取完毕后关闭文件
  start: 0, // 开始读取的位置
  end: 6111, // 默认 Infinity无限读取，start和end都包含在内
  highWaterMark: 2 // 默认64kb 也就是1024字节 * 64
})
// 如果是每次读取两个字节，就会造成乱码,为什么当highWaterMark为非3倍数的时候，chunk.toString()乱码数量和字节数匹配不上
// let str = ''
let buffers = []
rs.on('data', (chunk) => {
  // str += chunk
  buffers.push(chunk)
  if (buffers.length === 1) {
    rs.pause()
    setTimeout(() => {
      rs.resume()
    }, 3000)
  }
})
rs.on('end', () => {
  console.log(Buffer.concat(buffers).toString())
})
