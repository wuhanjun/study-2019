const http = require('http')
const fs = require('fs')
const langMap = {
  zh: '你好，李珊',
  en: 'hello'
}
http.createServer((req, res) => {
  console.log(req.headers['accept-language'])
  const language = req.headers['accept-language'] // en    zh-CN;q=0.9    zh;q=0.8
  let sortedLanguages
  if (language) {
    sortedLanguages = language.split(',').map((item) => {
      const [lang, q = ';q=1'] = item.split(';')
      return {
        lang,
        q: q.split('=')[1]
      }
    }).sort((a, b) => b.q - a.q) // 注意：sort方法原地排序 compare方法如果返回值大于0，则b排到a前面。
    if (sortedLanguages) {
      for (let i = 0, len = sortedLanguages.length; i < len; ++i) {
        const lang = sortedLanguages[i].lang
        if (langMap[lang]) {
          res.setHeader('Content-type', 'text/plain;charset=utf8')
          return res.end(langMap[lang])
        }
      }
    }
  }

  fs.createReadStream('./language.html').pipe(res)
}).listen(3000)
