var http = require('http'),
    httpProxy = require('http-proxy');
// 代理服务器为http://localhost:8000，将请求代理到9000端口上
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://localhost:9000' }).listen(8000); // See (†)

//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);