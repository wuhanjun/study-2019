class TapParse {
  apply (compiler) {
    compiler.hooks.compile.tap('hhh', (a) => {
      console.log('compile', a)
    })
    compiler.hooks.emit.tap('hhh', (a) => {
      console.log('emit', a)
    })
  }
}
module.exports = TapParse
