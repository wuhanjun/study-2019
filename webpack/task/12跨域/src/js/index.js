class A {
  constructor () {
    console.log('1111')
  }
}

const a = new A()
console.log(a)

const xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    console.log('请求成功')
  }
}

xhttp.open('GET', '/user', true)
xhttp.send()
