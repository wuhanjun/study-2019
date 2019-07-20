const buffer = new Buffer(10)
// console.log(buffer)
// console.log(buffer.length)

// console.log(buffer[0])
buffer[0] = 1
buffer[1] = 1.1
buffer[2] = -1
buffer[3] = 300
// console.log(buffer[0])
// console.log(buffer[1]) // 1 (1.1 -> 1)
// console.log(buffer[2]) // 255 (-1 + 256)
// console.log(buffer[3]) // 44 (300 - 256)
let b2 = Buffer.from('abc')
let b3 = new Buffer('abc')
let b4 = Buffer.alloc(3, 'abc')
console.log(b2)
// console.log(b3)
// console.log(b4)
// console.log(b2[0])
b2.forEach((i) => {
  console.log(i)
})
// console.log(b2.indexOf('a'))
// let b2 = Buffer.from('abc')
// console.log(b2.toString('utf-8', 0, 1))
