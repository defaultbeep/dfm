#! /usr/bin/env node

let program = require('commander')
const status = require('./commands/status')
const sync = require('./commands/sync')
const missing = require('./commands/missing')

program
  .version('0.0.5')

program
  .command('status')
  .action(status)

program
  .command('sync')
  .action(sync)

program
  .command('missing')
  .action(missing)

program
.parse(process.argv)

