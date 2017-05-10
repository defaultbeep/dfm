#! /usr/bin/env node

let program = require('commander')
const status = require('./commands/status')
const sync = require('./commands/sync')

program
  .version('0.0.1')

program
  .command('status')
  .action(status)

program
  .command('sync')
  .action(sync)

program
.parse(process.argv)

