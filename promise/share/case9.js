const Promise = require('./promise8.js')
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

const deferred = Promise.deferred()

deferred.promise.then((data) => {
  console.log('good')
  console.log(data)
}).catch((reason) => {
  console.log('我报错啦!!!')
  console.log(reason)
})

// 正确
readFile('./text/text1.txt').then((data) => {
  deferred.resolve(data)
}).catch((err) => {
  deferred.reject(err)
})

// 错误
// readFile('./text/text1').then((data) => {
//   console.log(data)
//   deferred.resolve()
// }).catch((err) => {
//   deferred.reject(err)
// })
