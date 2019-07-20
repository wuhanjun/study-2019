
module.exports = {
  get body () {
    console.log('get body')
    return this._body
  },
  set body (val) {
    console.log('set body')
    this.res._statusCode = 200
    this._body = val
  }
}
