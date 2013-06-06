#!/usr/bin/env node
var junction = require('../')
  , path = require('path')
  , fs = require('fs')
  , argv = require('optimist')
      .usage('Start your cluster plan\nUsage: $0')
      .demand('f')
      .alias('f', 'file')
      .describe('f', 'Cluster plan')
      .alias('w', 'watch')
      .describe('w', 'Watch for file changes')
      .alias('s', 'silent')
      .describe('s', 'Silent the output')
      .argv

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

junction(JSON.parse(fs.readFileSync(argv.file)), { base: path.dirname(argv.file), watch: argv.watch, silent: argv.silent })
