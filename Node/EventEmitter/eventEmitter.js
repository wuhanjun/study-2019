class EventEmitter {
  constructor () {
    this._events = {}
  }
  on (name, cb) {
    // 用于处理子类继承EventEmitter父类的时候，子类实例中没有_events属性的情况
    // (不可能每次都需要在子类的构造函数中call一遍父类，比较麻烦)
    // this._events = this._events ? this._events : {}

    if (this._events[name]) {
      this._events[name].push(cb)
    } else {
      this._events[name] = [cb]
    }
    if (name !== 'newListener') {
      this.emit('newListener', name)
    }
  }
  off (name, cb) {
    if (this._events[name]) {
      // _o是original的缩写，用于兼容once的情况。
      this._events[name] = this._events[name].filter((item) => item !== cb && item._o !== cb)
    }
  }
  once (name, cb) {
    const once = (...args) => {
      // console.log('8765678iuhgt67uhgt678i', this)
      cb(...args)
      this.off(name, once)
    }
    // 将原函数挂载到新once函数上，便于off取消订阅
    once._o = cb
    this.on(name, once)
  }
  emit (name, ...args) {
    if (this._events[name]) {
      this._events[name].forEach((item) => item(...args))
    }
  }
}

// class A extends EventEmitter {
//   a () {
//     console.log(this._events)
//   }
// }

// let a = new A()
// a.a()

module.exports = EventEmitter
