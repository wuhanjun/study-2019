const less = require('less')
module.exports = (sourcecode) => {
  let css = ''
  less.render(sourcecode, (err, code) => {
    if (!err) {
      css = code.css
    }
  })
  css = css.replace(/\n/g, '\\n')
  return css
}
