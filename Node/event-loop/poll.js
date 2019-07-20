const fs = require('fs')

setTimeout(() => {
  console.log('setTimeout')
}, 2000)

fs.readFile('./test.md', 'utf-8', () => {
  console.log(1111)
  let a = 1
  setImmediate(() => {
    console.log('setImmediate')
  })
  // while (a < 2) {}
})

let index = 0

function handler () {
  if (index++ >= 1000) return
  // console.log(`nextTick ${index}`)
  // process.nextTick(handler)
  console.log(`setImmediate ${index}`)
  setImmediate(handler)
}

function handler2 () {
  console.log(`setImmediate 111`)
  // while (index < 1000000){}
}

setTimeout(() => {
  console.log('5----------------')
}, 5)

setTimeout(() => {
  console.log('10----------------')
}, 10)

setTimeout(() => {
  console.log('12----------------')
}, 15)

setTimeout(() => {
  console.log('20----------------')
}, 20)

setTimeout(() => {
  console.log('25----------------')
}, 25)

handler()

fs.readFile('./test.md', 'utf-8', () => {
  console.log(2222)
})
