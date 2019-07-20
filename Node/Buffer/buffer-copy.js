// copy 其实就是把Buffer对象中都每一个元素都拷贝过去
Buffer.prototype.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = 0, len = sourceEnd - sourceStart; i < len; i++) {
    target[targetStart + i] = this[sourceStart + i]
  }
  console.log('hia')
}

let targetBuf = Buffer.alloc(15) // 五个中文，15个字节
let sourceBuf = Buffer.from('我是')
let sourceBuf2 = Buffer.from('吴晗君')

sourceBuf.copy(targetBuf, 0, 0, 6)
sourceBuf2.copy(targetBuf, 6, 0, 9)

console.log(targetBuf.toString())
console.log(targetBuf.length)
