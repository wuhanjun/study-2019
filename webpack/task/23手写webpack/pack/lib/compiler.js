const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const babylon = require('babylon') // 巴比伦，用于将转换源码为ast
const traverse = require('@babel/traverse').default // 遍历ast节点
const types = require('@babel/types') // 替换节点，生成对应的表达式。
const generate = require('@babel/generator').default // 生成
const {SyncHook} = require('tapable')

module.exports = class Compiler {
  constructor (options) {
    this.options = options
    this.init()
  }

  init () {
    this.entryId = ''
    this.modules = {}
    this.root = process.cwd()
    this.entry = this.options.entry
    this.hooks = {
      emit: new SyncHook(['感觉这个参数没什么用']),
      compile: new SyncHook(['感觉这个参数没什么用']),
      done: new SyncHook(['感觉这个参数没什么用']),
      entryOptions: new SyncHook(['感觉这个参数没什么用'])
    }
    const plugins = this.options.plugins
    plugins.forEach((plugin) => {
      plugin.apply(this)
    })
    this.hooks.entryOptions.call('第一个订阅事件的参数')
  }

  run () {
    const entryAbsolutePath = this.getModuleAbsolutePath(this.options.entry)
    this.buildModules(entryAbsolutePath, true)
    this.hooks.compile.call('第一个订阅事件的参数')
    this.emitFile()
    this.hooks.done.call('第一个订阅事件的参数')
  }

  buildModules (moduleAbsolutePath, isEntry) {
    // 获取源代码
    let sourceCode = this.getSourceCode(moduleAbsolutePath)
    // 用loaders处理源代码
    sourceCode = this.pipeLoader(sourceCode, moduleAbsolutePath)
    // 获取相对路径，作为modules的id，需要相对路径的原因是：webpack modules列表里的key都是相对路径。
    const moduleId = this.getModuleId(moduleAbsolutePath)
    // 设置入口id
    isEntry && (this.entryId = moduleId)
    // 解析源代码，转成打包后的代码
    const parentPath = path.dirname(moduleId)
    const {generatorCode, dependencies} = this.parse(sourceCode, parentPath)
    // 将生成的，处理过require的代码放入modules中
    this.modules[moduleId] = generatorCode
    dependencies.forEach((dep) => {
      this.buildModules(this.getModuleAbsolutePath(dep), false)
    })
  }

  emitFile () {
    const output = this.options.output
    const outputPath = path.join(output.path, output.filename)
    const template = this.getSourceCode(path.resolve(__dirname, '../template/temp.ejs'))
    let code = ejs.render(template, {
      entryId: this.entryId,
      modules: this.modules
    })
    fs.writeFileSync(outputPath, code)
    this.hooks.emit.call('调用了emitFile')
  }

  getSourceCode (path) {
    return fs.readFileSync(path, 'utf8')
  }

  // 加./的原因是
  // 例如this.root为 /user/xxx/project/
  // 例如sourcePath为/user/xxx/project/src/index.js
  // 那么path.relative(this.root, sourcePath)得到的就是 src/index.js
  // webpack的所有的key都是相对于根目录project/下的相对路径，所以加上./就是./src/index.js
  // 其他文件也是一样
  getModuleId (sourcePath) {
    return './' + path.relative(this.root, sourcePath)
  }

  getModuleAbsolutePath (relativePath) {
    return path.resolve(this.root, relativePath)
  }

  parse (source, parentPath) {
    const ast = babylon.parse(source)
    const dependencies = []
    traverse(ast, {
      CallExpression (p) {
        const node = p.node
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'

          let moduleName = node.arguments[0].value
          // 加上源代码中可能省略的
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
          moduleName = './' + path.join(parentPath, moduleName)
          // 生成字符串类型的参数
          node.arguments = [types.stringLiteral(moduleName)]
          dependencies.push(moduleName)
        }
      }
    })
    const generatorCode = generate(ast).code
    return {generatorCode, dependencies}
  }

  pipeLoader (sourceCode, moduleAbsolutePath) {
    const rules = this.options.rules
    if (rules && rules.length) {
      rules.forEach((rule) => {
        const {test, use} = rule
        if (test.test(moduleAbsolutePath)) {
          let idx = use.length
          function normalPipe () {
            if (idx > 0) {
              const loader = require(use[--idx])
              sourceCode = loader(sourceCode)
              normalPipe()
            }
          }
          normalPipe()
        }
      })
    }
    return sourceCode
  }
}
