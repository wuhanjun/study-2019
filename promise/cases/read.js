const fs = require('fs')
const Promise = require('../promise-self')

// 高阶函数
function promisify (fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      // todo:如果最后一个参数是函数，就把它去掉
      fn(...args, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

function read (url) {
  const readFile = promisify(fs.readFile)
  return readFile(url, 'utf-8')
}

Promise.all([
  read('./name.txt'),
  read('./age.txt'),
  48
]).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

Promise.race([
  read('./name.txt'),
  read('./age.txt'),
  45
]).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})
