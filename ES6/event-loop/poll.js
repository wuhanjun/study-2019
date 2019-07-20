const fs = require('fs')

setTimeout(() => {
  console.log('timeout')
}, 2000)

fs.readFile('./test.md', 'utf-8', () => {
  console.log(1111)
  let a = 1
  setImmediate(() => {
    console.log('timeout')
  })
  while (a < 2) {}
})

fs.readFile('./test.md', 'utf-8', () => {
  console.log(2222)
})
