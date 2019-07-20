
import a from './a'
import b from './b'
import jquery from 'jquery'
a()
b()
console.log('index.js')
console.log(jquery)

const btn = document.createElement('button')
btn.innerHTML = '哈哈'
document.body.appendChild(btn)

btn.addEventListener('click', (e) => {
  console.log('hahahhaha')
  import('./a.js').then((module) => {
    console.log(module.default)
  })
})

// console.log(calc.sum(1, 2), '----------')
