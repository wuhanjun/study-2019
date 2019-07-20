const fs = require('fs')
const EventEmitter = require('../EventEmitter/eventEmitter')
class CreateReadStream extends EventEmitter {
  constructor (path, options = {}) { // 这里注意添加默认空对象
    super()
    this.path = path
    this.flags = options.flags || 'w' // 默认写入
    this.encoding = options.encoding || 'utf8' // 默认'utf8'
    this.fd = options.fd || null // 取拿一个文件，默认null，createReadStream自己处理得到
    this.mode = options.mode || 0o666 // 默认值可读可写不可操作
    this.autoClose = options.autoClose || true // 默认 ture，读取完毕后关闭文件
    this.highWaterMark = options.highWaterMark || 16 * 1024
    this.open()
    this.pos = this.start || 0
    this.len = 0
    this.writing = false
    this.cache = []
  }
  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  /**
   *
   *
   * @param {*} chunk
   * @param {*} [encoding=this.encoding]
   * @param {*} callback
   * @returns true|false
   * @description 返回的布尔值标识当前要写入文件的大小大于highWaterMark值，
   * 也就是说写入速度慢于读取速度。
   * @memberof CreateReadStream
   */
  write (chunk, encoding = this.encoding, callback) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += buffer.length
    // console.log(this.len)
    if (this.len >= this.highWaterMark) {
      this.needDrain = true
    }
    if (!this.writing) {
      this._write(chunk, encoding, () => {
        typeof callback === 'function' && callback()
        this.clearCache()
      })
    } else {
      this.cache.push({
        chunk,
        encoding,
        callback
      })
    }
    return !this.needDrain
  }
  clearCache () {
    const task = this.cache.pop()
    if (task) {
      const {chunk, encoding, callback} = task
      this._write(chunk, encoding, () => {
        typeof callback === 'function' && callback()
        this.clearCache()
      })
    } else {
      if (this.needDrain) {
        this.needDrain = false
        this.writing = false
        // drain: 耗尽
        // drain事件的作用是告知使用方
        // 当前任务队列或当前写入任务中的buffer长度已经超过highWaterMark，
        // 最好等待队列中的写入任务处理完成，再进行写入操作。
        this.emit('drain')
      }
    }
  }
  _write (chunk, encoding, callback) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, callback))
      // return this.once('open', this._write)
      // 如果这样写的话，就是直将一个函数作为this.once的参数传入，相当于将该函数赋值给一个局部变量
      // 所以该函数中的this指向为全局,严格模式下为undefined。
    }
    fs.write(this.fd, chunk, this.pos, encoding, (err, written) => {
      if (err) return this.emit('error', err)
      this.len -= written
      this.pos += written
      typeof callback === 'function' && callback()
    })
  }
}

module.exports = CreateReadStream
