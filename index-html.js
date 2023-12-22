console.log('🕖 Starting...')

import { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'

// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say } = cfonts
const http = require('http');
const fs = require('fs');
const path = require('path');

const rl = createInterface(process.stdin, process.stdout)
// require("http").createServer((_, res) => res.end(`>> KIBOT SERVER DEDICATED (STATUS ON)\n\n>> NOMOR BOT    : +62 823-4492-1406\n>> NOMOR OWNER  : +62 858-2492-6014\n\n`)).listen(8080)
const PORT = 8080;

http.createServer((req, res) => {
  const filePath = path.join(__dirname, './views/index.html');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading ${filePath}`);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));

say('PutraModz', {
  font: 'chrome',
  align: 'center',
  colors: ['red', 'magenta']
})
say(` NexBotz By @PutraModz`, {
  font: 'console',
  align: 'center',
  colors: ['red', 'magenta']
})

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['magenta']
  })
  say('⸙ MEMUAT SOURCE...', {
    font: 'console',
    align: 'center',
    colors: ['blue']
  })
  say('⸙ MEMUAT PLUGINS...', {
    font: 'console',
    align: 'center',
    colors: ['blue']
  })
  say('✅ DONE !', {
    font: 'console',
    align: 'center',
    colors: ['white']
  })
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('[❗] Exited with code:', code)
    if (code === 0) return
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('main.js')
