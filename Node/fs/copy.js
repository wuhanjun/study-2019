const path = require('path')
const fs = require('fs')

function copy(sourceSrc, targetSrc) {
  fs.readFile(sourceSrc, (e, data) => {
    // 默认读取类型为buffer，可以指定encoding为utf-8，但是在copy里面一般不改变编码类型，如果原资源是图片呢
    if (e) return console.log(e)
    fs.writeFile(targetSrc, data, e => {
      // 这里一样。
      if (e) console.log(e)
    })
  })
}

copy(
  path.resolve(__dirname, './test/1.md'),
  path.resolve(__dirname, './test/2.md')
)

let buffer = Buffer.alloc(9)
// path 路径
// flags 对文件的操作类型 w r + a
// mode 权限 读取(4)、写入(2)、执行(1)
// 默认为八进制0o666 也就是十进制的438
// 444 分别对应自己、群组、其他
fs.open(path.resolve(__dirname, './test/1.md'), 'r', 0o444, (err, fd) => {
  if (err) return console.log(err)
  // fd(file descriptor) 文件描述符，从fd指定的文件中读取数据(其实就是个文件id)
  // buffer 是数据将写入的缓冲区
  // offset 0 buffer中写入的偏移量
  // length 9 读取的字节数
  // position 0 指定从文件读取的位置
  fs.read(fd, buffer, 0, 9, 0, (err, bytesRead) => {
    if (err) return console.log(err)
    // bytesRead实际读取到的个数
    console.log(bytesRead)
    console.log(buffer.toString())
  })
})

let buffer2 = Buffer.from('我是吴晗君')
// r+表示读取并写入，如果没有文件会报错
// w+表示读取并写入，如果没有文件会创建新文件，不会报错
fs.open(path.resolve(__dirname, './test/3.md'), 'w+', (err, fd) => {
  if (err) return console.log(err)
  fs.write(fd, buffer2, 0, 15, (err, bytesWritten, buffer) => {
    if (err) return console.log(err)
    console.log('被写入的字节数:', bytesWritten)
    console.log('buffer:', buffer)
    console.log('bufferStr:', buffer.toString())
  })
})

// 不把open放在里面的原因是要递归读取，如果放在里面的话每次递归都要读取一遍。
function copy2 (sourceSrc, targetSrc) {
  const memory = 3 // 每次都以3个字节的数量读取并写入
  const buffer = Buffer.alloc(memory)
  let offset = 0
  let position = 0
  fs.open(sourceSrc, 'r', (err, fd) => {
    if (err) return console.log(err)
    fs.read(fd, buffer, offset, memory, position, (err, bytesRead, buffer) => {
      if (err) return console.log(err)
      fs.open(targetSrc, 'w', (err, fd) => {
        if (err) return console.log(err)
        fs.write(fd, buffer, offset, memory, position, (err, bytesWritten, buffer) => {
          if (err) return console.log(err)
          console.log('被写入的字节数:', bytesWritten)
          console.log('buffer:', buffer)
          console.log('bufferStr:', buffer.toString())
          position += memory
        })
      })
    })
  })
}

// 拷贝 文件流
function copy3 (sourceSrc, targetSrc) {
  const memoryLen = 3 // 每次都以3个字节的数量读取并写入
  const buffer = Buffer.alloc(memoryLen)
  let position = 0

  fs.open(sourceSrc, 'r', (err, readFd) => {
    if (err) return console.log(err)
    fs.open(targetSrc, 'w', (err, writeFd) => {
      if (err) return console.log(err)
      function next () {
        fs.read(readFd, buffer, 0, memoryLen, position, (err, bytesRead, buffer) => {
          if (err) return console.log(err)
          // 如果能读取到文件内容就进行复制，而不是想着得到整个文件内容的长度进而进行比较
          if (bytesRead > 0) { 
            // 这里用bytesRead而不是memoryLen的原因是如果最后一次读取长度不够3个字节，只有一个字节
            // 那么buffer内被写入的只能是那一个字节，后面两个字节不变。所以会多出一段内容
            fs.write(writeFd, buffer, 0, bytesRead, position, (err, bytesWritten, buffer) => {
              if (err) return console.log(err)
              console.log('被写入的字节数:', bytesWritten)
              console.log('buffer:', buffer)
              console.log('bufferStr:', buffer.toString())
              position += memoryLen
              next()
            })
          } else {
            // 读取完毕
            fs.close(readFd, () => {})
            fs.close(writeFd, () => {})
          }
        })
      }
      next()
    })
  })
}

copy3(path.resolve(__dirname, './test/1.md'), path.resolve(__dirname, './test/3.md'))
