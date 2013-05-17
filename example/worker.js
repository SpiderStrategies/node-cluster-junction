var http = require('http')

setInterval(function () {
  http.request({
    port: 3000 + Math.round(Math.random()),
    hostname: '127.0.0.1',
    method: 'GET'
  }, function (res) {
    res.pipe(process.stdout)
  }).end()
}, 3000)
