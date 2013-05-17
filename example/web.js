var http = require('http')

var server = http.createServer(function (req, res) {
  res.end('Boom!' + process.env.PORT + '\r\n')
})

server.listen(process.env.PORT)
