module.exports = {
  get method () { // this指向调用method的对象 xxx.method，this就是xxx
    return this.req.method
  }
}
