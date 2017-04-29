#!/usr/bin/env node

const replace = require('replace')
const meow = require('meow')
const cli = meow(`
    Usage:
        $ smart-to-dumb-quotes FILES [options]

    Options:
        -h, --help         print usage information
        -v, --version      show version info and exit
        -r, --recursive    replace recursively
        -s, --single       only replace single quotes
        -d, --double       only replace double quotes
        --debug            Do not be silent
`, {
  alias: {
    h: 'help',
    v: 'version',
    r: 'recursive',
    s: 'single',
    d: 'double'
  }
})

if ((!cli.flags.single && !cli.flags.double) || (!cli.flags.single && cli.flags.double)) {
  replace({
    regex: '[“”]',
    replacement: '"',
    paths: cli.input,
    recursive: cli.recursive,
    silent: (cli.debug !== undefined) ? cli.debug : true
  })
}

if ((!cli.flags.single && !cli.flags.double) || (cli.flags.single && !cli.flags.double)) {
  replace({
    regex: '[‘’]',
    replacement: "'",
    paths: cli.input,
    recursive: cli.recursive,
    silent: (cli.debug !== undefined) ? cli.debug : true
  })
}
