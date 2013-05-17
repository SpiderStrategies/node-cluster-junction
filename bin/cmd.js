#!/usr/bin/env node
var junction = require('../')
  , path = require('path')
  , fs = require('fs')
  , argv = require('optimist')
      .usage('Start your cluster plan\nUsage: $0')
      .demand('f')
      .alias('f', 'file')
      .describe('f', 'Cluster plan')
      .argv

junction(JSON.parse(fs.readFileSync(argv.file)), path.dirname(argv.file))
