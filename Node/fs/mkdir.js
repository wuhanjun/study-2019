const path = require('path')
const fs = require('fs')

// // 函数命名规范：动词 + 名次
// function insertStr (source, point, newStr) {
//   return source.slice(0, point) + newStr + source.slice(point)
// }

// // fs.mkdir不能自动创建空目录
// function mkdirSync (direction) {
//   let isAbsolute = path.isAbsolute(direction)
//   // ['', 'User', ....]
//   // 排除绝对路径split后第一个参数为空的情况
//   let dirs = direction.split('/').filter(dir => dir)
//   dirs.forEach((dir, idx) => {
//     // 数组方法为前闭后开
//     let current = dirs.slice(0, idx + 1).join('/')
//     if (isAbsolute) {
//       current = insertStr(current, 0, '/')
//     }
//     try {
//       fs.accessSync(current)
//     } catch (e) {
//       fs.mkdirSync(current)
//     }
//   })
// }

// mkdirSync(path.resolve(__dirname, './test/a/b/c/d'))
// mkdirSync('./test/a2/b2/c2/d2')

// function mkdirAsync (direction, cb) {
//   console.log(direction)
//   let isAbsolute = path.isAbsolute(direction)
//   // ['', 'User', ....]
//   // 排除绝对路径split后第一个参数为空的情况
//   let dirs = direction.split('/').filter(dir => dir)
//   const dirsLen = dirs.length
//   function next (idx) {
//     if (idx === dirsLen) return cb()
//     let current = dirs.slice(0, idx + 1).join('/')
//     if (isAbsolute) {
//       current = insertStr(current, 0, '/')
//     }
//     fs.access(current, (err) => {
//       if (err) {
//         fs.mkdir(current, (err) => {
//           if (err) return console.log(err)
//           idx += 1
//           next(idx)
//         })
//       } else {
//         idx += 1
//         next(idx)
//       }
//     })
//   }
//   next(0)
// }

// mkdirAsync(path.resolve(__dirname, './test/e/f/g/h'), () => {
//   console.log('创建成功')
// })

// mkdirAsync('./test/d2/e2/f2/g2', () => {
//   console.log('创建成功')
// })

async function mkdirAsync2 (directory) {
  const sep = path.sep
  const dirs = directory.split(sep)
  const len = dirs.length
  let idx = 1
  function mk () {
    if (idx > len) return // 因为slice前闭后开，所以要到len才能包含最后一位
    const current = dirs.slice(0, idx).join(sep)
    try {
      fs.accessSync(current)
      idx++
      mk()
    } catch (e) {
      fs.mkdirSync(current)
      mk()
    }
  }
  await mk()
}

mkdirAsync2('./test/32gggggg/d/f/g/h').then(() => {
  console.log('./test/g/d/f/g/h创建成功')
})

async function observeIsExist (dir) {
  return new Promise((resolve, reject) => {
    fs.access(dir, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

async function mkDir (dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

async function mkDirByPromise (directory) {
  const sep = path.sep
  const dirs = directory.split(sep)
  const len = dirs.length
  for (let i = 1; i < len + 1; ++i) {
    const current = dirs.slice(0, i).join(sep)
    try {
      await observeIsExist(current)
    } catch (e) {
      await mkDir(current)
    }
  }
}

mkDirByPromise('./test/4d/d/f/g/h').then(() => {
  console.log('./test/g/d/f/g/h创建成功')
})
