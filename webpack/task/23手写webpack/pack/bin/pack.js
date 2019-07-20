#!/usr/bin/env node

// 声明使用node执行

const Compiler = require('../lib/compiler')
const path = require('path')

const config = require(path.resolve('./webpack.config.js'))
const compiler = new Compiler(config)
try {
  compiler.run()
} catch (e) {
  console.log(e)
}
// compiler.run()