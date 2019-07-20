var fetch = require('node-fetch')

function* gen () {
  var url = 'https://cap.dingxiang-inc.com/api/a'
  var result = yield fetch(url)
  console.log('result', result)
}

var g = gen()
var result = g.next()

result.value.then(function (data) {
  return data.json()
}).then(function (data) {
  console.log(2, data)
  g.next(data)
})
