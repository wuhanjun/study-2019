// const path = require('path')
// console.log(path.basename('1.js.js', '.js'))
// console.log(path.join('test.js'))
// console.log(path.join(__dirname, 'test.js'))
// console.log(path.resolve(__dirname, 'test.js'))
// console.log(path.resolve('test.js')) // resolve方法可以把文件转为绝对路径

// console.log(path.resolve(__dirname, 'test.js', './'))
// console.log(path.join(__dirname, 'test.js', '/'))
// console.log(__dirname)
// console.log(process.cwd()) // 取得是目录名，不是文件名

// function execute (completeScript) {
//   const code = vm.runInNewContext(completeScript)
//   code.call()
// }

// function reduceFn (fns, initial) {
//   return fns.reduce((a, b) => b(a), initial)
// }

// function getModule (id) {
//   return new Module(id)
// }

const fs = require('fs')
const vm = require('vm')
const path = require('path')

function getFilePath (filePath) {
  // 前面还需要有一个是否绝对路径的判断
  let absolutePath = path.resolve(__dirname, filePath)
  let extname = path.extname(absolutePath)
  let realPath = ''
  if (extname) {
    try {
      fs.accessSync(absolutePath)
      realPath = absolutePath
    } catch (e) {}
  } else {
    for (let i = 0, len = Module._extnames.length; i < len; ++i) {
      try {
        let joinedPath = absolutePath + Module._extnames[i]
        console.log(joinedPath)
        fs.accessSync(joinedPath)
        realPath = joinedPath
        break
      } catch (e) {}
    }
  }
  if (!realPath) {
    var err = new Error(`Cannot find module '${filePath}'`)
    err.code = 'MODULE_NOT_FOUND'
    throw err
  }
  return realPath
}

function makeRequireFunction (mod) {
  function require (path) {
    return mod.require(path)
  }

  return require
}

function join (script) {
  return Module.makeUpFunctions[0] + script + Module.makeUpFunctions[1]
}

class Module {
  constructor (id) {
    this.id = id
    this.exports = {}
  }
  require (id) {
    return Module._load(id)
  }
  load (filePath) {
    const script = fs.readFileSync(filePath, 'utf-8')
    const code = vm.runInThisContext(join(script))
    this._compile(code)
  }
  _compile (code) {
    const require = makeRequireFunction(this)
    const result = code.call(this.exports, this.exports, require, this, __dirname, __filename)
    // 这个返回值在源码中没有用到。
  }
}

Module.makeUpFunctions = [
  '(function (exports, require, module, __dirname, __filename) {\n',
  '\n})'
]
Module._cache = []
Module._extnames = ['.js', '.json', '.node']
Module._load = function (id) {
  const module = new Module(id)
  const filePath = getFilePath(id)
  if (Module._cache[filePath]) {
    return Module._cache[filePath].exports
  }
  Module._cache[filePath] = module
  module.load(filePath)
  return module.exports
}

function require2 (id) {
  return Module._load(id)
}

const test = require2('./test')
const test2 = require2('./test')

console.log(test)
console.log(test2)

// const test = require('./test')
// const test2 = require('./textaasdasd')
// function req (id) {
//   // reduceFn([getModule, readFile, join, execute], id)
// }


// test()

// let a = {a: 1}
// let b = a

// function f (a, b) {
//   a = 777
// }
// f()
// console.log(a)
