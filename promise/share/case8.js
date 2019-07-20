const Promise = require('./promise7.js')
const fs = require('fs')

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

const readFileAsync = promisify(fs.readFile)
const readFile = (src) => readFileAsync(src, 'utf-8')

readFile('./text/text1.txt').then((data) => {
  console.log(data)
})

// Promise.all([
//   readFile('./text/text1.txt'),
//   readFile('./text/text2.txt'),
//   readFile('./text/text3.txt')
// ]).then(([text1, ...last]) => {
//   console.log(text1)
//   console.log(last)
// })

// Promise.race([
//   readFile('./text/text1.txt'),
//   readFile('./text/text2.txt'),
//   readFile('./text/text3.txt')
// ]).then((who) => {
//   console.log(who)
// })
