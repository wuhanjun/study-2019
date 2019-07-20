const path = require('path')
const fs = require('fs')

// // 删除目录 rmdirSync
// // 删除文件  unlinkSync
// // fs.statSync 文件的状态 statObj.isDirectory()
// // fs.readdirSync 读取目录 返回的是一个子目录名数组

// // 先序 深度 同步

// function removeDeepSync (directory) {
//   const statObj = fs.statSync(directory)
//   if (statObj.isDirectory()) {
//     const childDirs = fs.readdirSync(directory)
//     // 先删子目录
//     childDirs.forEach((dir) => {
//       removeDeepSync(path.resolve(directory, './', dir))
//     })
//     // 再删父目录
//     fs.rmdirSync(directory)
//   } else {
//     fs.unlinkSync(directory)
//   }
// }
// removeDeepSync('./test/a2')

// // 先序 广度 同步
// // 广度的基本思路：遍历每层目录，列出所有文件及文件夹，然后从最底层开始删除，一直删到最上面一层
// // 比如 这样到目录结构['a', 'a/b', 'a/c', 'a/b/d', 'a/c/e'] -> 倒序删除
// function removeWideSync (directory) {
//   let dirs = [directory]
//   let idx = 0
//   // 这里用while循环
//   while (dirs[idx]) {
//     const statObj = fs.statSync(dirs[idx])
//     if (statObj.isDirectory()) {
//       let childDirs = fs.readdirSync(dirs[idx])
//       // 注意这里只要和父级resolve就可以，不用每次都从0-idx，这样会造成路径多次叠加
//       childDirs = childDirs.map((dir) => path.resolve(dirs[idx], './', dir))
//       dirs = [...dirs, ...childDirs]
//     }
//     idx++
//   }
//   // 还可以用递归
//   // function push (idx) {
//   //   if (idx === dirs.length) return
//   //   const statObj = fs.statSync(dirs[idx])
//   //   if (statObj.isDirectory()) {
//   //     let childDirs = fs.readdirSync(dirs[idx])
//   //     // 注意这里只要和父级resolve就可以，不用每次都从0-idx，这样会造成路径多次叠加
//   //     childDirs = childDirs.map((dir) => path.resolve(dirs[idx], './', dir))
//   //     dirs = [...dirs, ...childDirs]
//   //   }
//   //   idx += 1
//   //   push(idx)
//   // }
//   // push(0)
//   dirs.reverse().forEach((dir) => {
//     const statObj = fs.statSync(dir)
//     if (statObj.isDirectory()) {
//       fs.rmdirSync(dir)
//     } else {
//       fs.unlink(dir)
//     }
//   })
// }

// removeWideSync('./test/e')

// // 先序 异步 深度 串行

// function removeDeepSerialAsync (directory, cb) {
//   fs.stat(directory, (err, stat) => {
//     if (err) return console.log(err)
//     if (stat.isDirectory()) {
//       fs.readdir(directory, (err, files) => {
//         if (err) return console.log(err)
//         let idx = 0
//         const len = files.length
//         if (files.length > 0) {
//           let current = path.resolve(directory, files[idx])
//           removeDeepSerialAsync(current, final)
//         } else {
//           fs.rmdir(directory, (err) => {
//             if (err) return console.log(err)
//             cb()
//           })
//         }
//         // 会发现，这个final做的事情，其实和上面的是一样的。
//         // 遇到这种情况，说明这个递归还可以优化。
//         // 将两部分互补一下，生成一个函数调用就可以了。
//         function final () {
//           if (++idx < len) {
//             let current = path.resolve(directory, files[idx])
//             removeDeepSerialAsync(current, cb)
//           } else {
//             console.log('directory', directory)
//             fs.rmdir(directory, (err) => {
//               if (err) return console.log(err)
//               cb()
//             })
//           }
//         }
//       })
//     } else {
//       fs.unlink(directory, cb)
//     }
//   })
// }
// removeDeepSerialAsync('./test/a2', () => {
//   console.log('成功')
// })

// function removeDeepSerialAsync2 (directory, cb) {
//   fs.stat(directory, (err, stat) => {
//     if (err) return console.log(err)
//     if (stat.isDirectory()) {
//       fs.readdir(directory, (err, dirs) => {
//         if (err) return console.log(err)
//         // 这里直接可以直接resolve directory的原因是
//         // 这里的dirs是它的直接子目录
//         dirs = dirs.map((dir) => path.resolve(directory, dir))
//         function next (idx) {
//           // 所有最底层的空目录在这里被删除
//           if (idx === dirs.length) {
//             fs.rmdir(directory, (err) => {
//               if (err) return console.log(err)
//               cb()
//             })
//           } else {
//             // 相当于有两层递归
//             // 这里的next用于删除相邻目录
//             removeDeepSerialAsync2(dirs[idx], () => next(idx + 1))
//           }
//         }
//         next(0)
//       })
//     } else {
//       // 所有最底层的文件在这里被删除
//       fs.unlink(directory, cb)
//     }
//   })
// }

// removeDeepSerialAsync2('./test/a', () => {
//   console.log('成功')
// })

// function removeDeepSerialAsync3 (directory, cb) {
//   fs.stat(directory, (err, stat) => {
//     if (err) return console.log(err)
//     // 如果是文件，那么继续往下深探，从最底层的开始删除，删完了删同层级的，同层级的删完了删父级本身。
//     if (stat.isDirectory()) {
//       fs.readdir(directory, (err, childDirs) => {
//         if (err) return console.log(err)
//         childDirs = childDirs.map((dir) => path.resolve(directory, dir))
//         function next (idx) {
//           if (idx === childDirs.length) {
//             return fs.rmdir(directory, cb)
//           }
//           removeDeepSerialAsync3(childDirs[idx], () => { next(++idx) })
//         }
//         next(0)
//       })
//     } else {
//       fs.unlink(directory, cb)
//     }
//   })
// }
// // 如果是以下目录结构
// //       a
// //   b       c
// // d   e   f   h.txt

// // 删除顺序就是d、e、b、f、h.txt、c、a
// removeDeepSerialAsync3('./test/a', () => {
//   console.log('成功')
// })

// // 先序 深度 并行 异步
// // 异步的核心其实都是找到最里层的*空目录*和*文件*进行删除
// // 并行删除的核心就需要计数，等所有直接子目录或子文件都删除完了，就删除父级目录。
// // function removeDeepParallelAsync (directory, cb) {
// //   fs.stat(directory, (err, stat) => {
// //     if (err) return console.log(err)
// //     if (stat.isDirectory()) {
// //       fs.readdir(directory, (err, childDirs) => {
// //         if (err) return console.log(err)
// //         const len = childDirs.length
// //         if (len === 0) {
// //           fs.rmdir(directory, (err) => {
// //             if (err) return console.log(err)
// //             cb()
// //           })
// //         }
// //         let idx = 0
// //         childDirs.forEach((dir) => {
// //           dir = path.resolve(directory, dir)
// //           removeDeepParallelAsync(dir, done)
// //         })
// //         function done () {
// //           idx++
// //           if (idx === len) {
// //             fs.rmdir(directory, (err) => {
// //               if (err) return console.log(err)
// //               cb()
// //             })
// //           }
// //         }
// //       })
// //     } else {
// //       fs.unlink(directory, cb)
// //     }
// //   })
// // }

// // removeDeepParallelAsync('./test/a2', () => {
// //   console.log('成功')
// // })

// function removeDeepParallelAsync2 (directory, cb) {
//   fs.stat(directory, (err, stat) => {
//     if (err) return console.log(err)
//     if (stat.isDirectory()) {
//       fs.readdir(directory, (err, childDirs) => {
//         if (err) return console.log(err)
//         const len = childDirs.length
//         if (len === 0) {
//           fs.rmdir(directory, (err) => {
//             if (err) return console.log(err)
//             cb()
//           })
//         }
//         let idx = 0
//         childDirs.forEach((dir) => {
//           dir = path.resolve(directory, dir)
//           removeDeepParallelAsync2(dir, done)
//         })
//         function done () {
//           if (++idx === len) {
//             fs.rmdir(directory, (err) => {
//               if (err) return console.log(err)
//               cb()
//             })
//           }
//         }
//       })
//     } else {
//       fs.unlink(directory, (err) => {
//         if (err) return console.log(err)
//         cb()
//       })
//     }
//   })
// }

// removeDeepParallelAsync2('./test/a2', () => {
//   console.log('成功')
// })

// 先序 异步 串行 广度
// ['a', 'a/b', 'a/c', 'a/b/d', 'a/b/e, 'a/c/d', 'a/c/e']
// function removeWideParallelAsync (directory, cb) {
//   let dirs = [directory]
//   function flatTree (idx) {
//     if (idx === dirs.length) return rm()
//     let current = dirs[idx]
//     fs.stat(current, (err, stat) => {
//       if (err) return console.log(err)
//       if (stat.isDirectory()) {
//         fs.readdir(current, (err, childDirs) => {
//           if (err) return console.log(err)
//           childDirs = childDirs.map((dir) => path.resolve(current, dir))
//           dirs = dirs.concat(childDirs)
//           flatTree(++idx)
//         })
//       } else {
//         flatTree(++idx)
//       }
//     })
//   }
//   flatTree(0)

//   function rm () {
//     const current = dirs.pop()
//     if (!current) return cb()

//     fs.stat(current, (err, stat) => {
//       if (err) return console.log(err)
//       if (stat.isDirectory()) {
//         fs.rmdir(current, rm)
//       } else {
//         fs.unlink(current, rm)
//       }
//     })
//   }
// }

// removeWideParallelAsync('./test/a2', () => {
//   console.log('删除成功')
// })

// 先序 异步 深度 并行
// function removeDeepParallelAsyncPromise (directory) {
//   return new Promise((resolve, reject) => {
//     fs.stat(directory, (err, stat) => {
//       if (err) return console.log(err)
//       if (stat.isDirectory()) {
//         fs.readdir(directory, (err, childDirs) => {
//           if (err) return console.log(err)
//           childDirs = childDirs.map((dir) => removeDeepParallelAsyncPromise(path.resolve(directory, dir)))
//           Promise.all(childDirs).then(() => fs.rmdir(directory, resolve))
//         })
//       } else {
//         fs.unlink(directory, resolve)
//       }
//     })
//   })
// }

// removeDeepParallelAsyncPromise('./test/a').then(() => {
//   console.log('删除成功')
// })


