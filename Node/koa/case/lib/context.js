const ctx = {

}

// 分开处理是因为有的属性不需要set比如method，有的属性需要set 比如body。有的有get，有的没有get
// 这样的话，就需要多一层判断，多加一个参数。
function defineGetter (prop, key) {
  ctx.__defineGetter__(key, function () {
    return this[prop][key]
  })
}

function defineProperty (prop, key) {
  Object.defineProperty(ctx, key, {
    get: function () {
      return this[prop][key]
    },
    set: function (val) {
      this[prop][key] = val
    }
  })
}

defineGetter('request', 'method')
// defineGetter('response', 'body')
defineProperty('response', 'body')

module.exports = ctx
