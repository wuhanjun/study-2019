const Promise = require('./promise-self')

// console.log(1)
// new Promise((resolve, reject) => {
//   console.log(2)
//   resolve()
// }).then(() => {
//   console.log(3)
// })
// console.log(4)

// Promise.resolve(1)
//   .then(x => x + 1)
//   .then(() => { throw new Error('asda') })
//   .catch(() => 1)
//   .then((x) => x + 1)
//   .then((x) => console.log(x))

// new Promise(() => {
//   resolve()
// }).then(() => {

// })

async function async1 () {
  console.log(111)
  Promise.resolve(1).then(() => {
    console.log(444)
  })
  let a = await async2()
  console.log(a)
}

async function async2 () {
  console.log(222)
}

async1()

setTimeout(() => {
  console.log('setTimeout')
}, 0)

let a = new Promise((resolve) => {
  console.log('promise1')
  resolve()
})