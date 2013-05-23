var forever = require('forever-monitor')
  , path = require('path')

module.exports = function (plan, conf) {
  if (!plan || typeof plan !== 'object') {
    throw new Error('Plan needed')
  }

  conf = conf || {}
  conf.base = conf.base || ''

  var work = Object.keys(plan).reduce(function (cluster, name) {
    var n = plan[name].number || 1
      , mode = plan[name].mode || process.env.NODE_ENV

    if (mode === process.env.NODE_ENV) {
      cluster[name] = n
    }

    return cluster
  }, {})

  Object.keys(work).forEach(function (name) {
    var command = plan[name].command

    for (var i = 0; i < work[name]; i++) {
      var opts = {
        silent: process.env.NODE_ENV === 'production',
        sourceDir: path.join(process.cwd(), conf.base)
      }

      if (plan[name].port) {
        opts.env = {
          PORT: plan[name].port + i
        }
      }

      var child = new (forever.Monitor)(command, opts)

      child.start()

      child.on('restart', function () {
        console.log(command, ' has been restarted')
      })

      child.on('exit', function () {
        console.log(command, 'has exited')
      })
    }
  })

}
