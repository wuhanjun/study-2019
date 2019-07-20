const CreateWriteStream = require('./CreateWriteStream')
// const Test = require('./test')
// const fs = require('fs')

const ws = new CreateWriteStream('./test/2.md', {
  flags: 'w', // 默认读取
  encoding: 'utf8', // 默认utf8
  fd: null, // 取拿一个文件，默认null，createReadStream自己处理得到
  mode: 0o666, // 默认值可读可写不可操作
  highWaterMark: 1,
  autoClose: true // 默认 ture，读取完毕后关闭文件
})

let i = 9

function write () {
  let flag = true
  while (i && flag) {
    flag = ws.write(i-- + '')
    console.log(flag)
  }
}

write()

ws.on('drain', () => {
  console.log('drain')
  write()
})

ws.on('open', () => {
  console.log('open')
})

ws.on('error', () => {
  console.log('error')
})
