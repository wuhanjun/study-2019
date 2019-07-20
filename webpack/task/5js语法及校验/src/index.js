const add = require('./add')
require('./styles/index.css')
require('./styles/index.less')

const result = add(1, 2)

console.log(result)

function testable(target) {
  target.isTestable = true;
  target.prototype.xxx = 1
}

@testable

class A {
  a = 1
}

class B {
  a = 1
}

const p = new Promise((resolve) => {resolve()})
console.log(p)

// generator 需要@babel/transform-runtime-plugin 以及@babel/runtime插件
const func = async () => {
  await 1
}

const b = new A()
console.log(b)

// includes需要@babel/polyfill插件
let str = 'i am a str'
console.log('includes:', str.includes('str'))
