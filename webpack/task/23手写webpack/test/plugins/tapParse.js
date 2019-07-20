class TapParse {
  apply (compiler) {
    compiler.hooks.entryOptions.tap('hhh', (a) => {
      console.log('entryOptions', a)
    })
    compiler.hooks.done.tap('hhh', (a) => {
      console.log('done', a)
    })
  }
}
module.exports = TapParse
