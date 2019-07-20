setImmediate(() => {
  console.log(6)
})

new Promise((resolve) => {
  console.log(1)
  for (let i = 0; i < 9999; ++i) {
    i === 9998 && resolve()
  }
  console.log(2)
}).then(() => {
  console.log(5)
})

let a = +new Date()
setTimeout(() => {
  console.log('时间:', +new Date() - a)
  console.log(4)
}, 0)

console.log(3)

// 1, 2, 3, 5, 6/4
