const fs = require('fs')
const EventEmitter = require('../EventEmitter/eventEmitter')
class CreateReadStream extends EventEmitter {
  constructor (path, options = {}) { // 这里注意添加默认空对象
    super()
    this.path = path
    this.flags = options.flags || 'r' // 默认读取
    this.encoding = options.encoding || null // 默认null
    this.fd = options.fs || null // 取拿一个文件，默认null，createReadStream自己处理得到
    this.mode = options.mode || 0o666 // 默认值可读可写不可操作
    this.autoClose = options.autoClose || true // 默认 ture，读取完毕后关闭文件
    this.start = options.start || 0 // 开始读取的位置
    this.end = options.end || Infinity // 默认 Infinity无限读取
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 默认64kb 也就是1024字节 * 64

    this.open()
    this.on('newListener', (name) => {
      if (name === 'data') {
        this.flowing = true
        this.read()
      }
    })
    this.pos = this.start
    this.flowing = false
  }
  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read () {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    const {end, highWaterMark, pos, fd, encoding} = this
    // start和end都包含在内
    const howManyToRead = this.end ? Math.min(end - this.pos + 1, highWaterMark) : highWaterMark
    const buffer = Buffer.alloc(howManyToRead)
    // 如果继承Readable来写的话，fs.read这套逻辑其实就是写在_read里面，然后在回调中调用this.push(chunk)，由其内部来emit('data')
    fs.read(fd, buffer, 0, howManyToRead, pos, (err, bytesRead) => {
      if (err) return this.emit('error', err)
      if (bytesRead > 0) {
        this.pos += bytesRead
        this.emit('data', encoding ? buffer.toString(encoding) : buffer)
        if (this.flowing) {
          this.read()
        }
      } else {
        this.emit('end')
        if (this.autoClose) {
          fs.close(this.fd, (err) => {
            if (err) return this.emit('error', err)
            this.emit('close')
            this.flowing = false
          })
        }
      }
    })
  }
  pause () {
    this.flowing = false
  }
  resume () {
    this.flowing = true
    this.read()
  }
  pipe (ws) {
    this.on('data', (chunk) => {
      let canFlowing = ws.write(chunk)
      if (!canFlowing) {
        this.pause()
      }
    })
    this.on('drain', () => {
      this.resume()
    })
  }
}

module.exports = CreateReadStream
