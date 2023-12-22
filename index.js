console.log('🕖 Starting...')

import { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import readline from "readline"
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const http = require('http');

const app = express();
const port = process.env.PORT || 8001;
const baseURL = 'http://localhost'
// Membuat folder untuk mengunggah file
if (!fs.existsSync('./public/file')) fs.mkdirSync('./public/file');

// Fungsi untuk membuat nama acak
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// Fungsi untuk memformat ukuran berkas
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

app.set('json spaces', 2);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: 'public/file',
  filename: (req, file, cb) => {
    cb(null, makeid(6) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50000000, // 50 MB
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route GET API
app.get('/api/tiktok', async (req, res) => {
  try {
    const url = req.query.url;
    const apiUrl = `https://www.tikwm.com/api/?url=${url}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json({
        status: true,
        creator: `IG: callme_kiro`,
        donate: `https://saweria.co/kirofyzu`,
        result: data
      })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/openai', async (req, res, next) => {
var query = req.query.query
if(!query) return res.json({ status : false, creator : `Ig: @callme_kiro`, message : "masukan parameter query"})
    try {
  async function CleanDx(your_qus) {
  let linkaiList = [];
  let linkaiId = generateRandomString(21);
  let Baseurl = "https://vipcleandx.xyz/";

  console.log(formatTime());
  linkaiList.push({
    "content": your_qus,
    "role": "user",
    "nickname": "",
    "time": formatTime(),
    "isMe": true
  });
  linkaiList.push({
    "content": "正在思考中...",
    "role": "assistant",
    "nickname": "AI",
    "time": formatTime(),
    "isMe": false
  });
  if (linkaiList.length > 10) {
    linkaiList = linkaiList.shift();
  }

 let response = await fetch(Baseurl + "v1/chat/gpt/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": generateRandomIP(),
      "Referer": Baseurl,
      "accept": "application/json, text/plain, */*"
    },
    body: JSON.stringify({
      "list": linkaiList,
      "id": linkaiId,
      "title": your_qus,
      "prompt": "",
      "temperature": 0.5,
      "models": "0",
      "continuous": true
    })
  })
  const data = await response.text();
    
    return data;
}

function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

function generateRandomIP() {
  const ipParts = [];
  for (let i = 0; i < 4; i++) {
    const randomPart = Math.floor(Math.random() * 256);
    ipParts.push(randomPart);
  }
  return ipParts.join('.');
}

function formatTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
      const result = await CleanDx(query)
      res.json({
      status: true,
      creator: `Ig: @callme_kiro`,
      result
    })
  } catch (err) {
    console.log(err)
    res.json({
      status: false,
      creator: `Ig: @callme_kiro`,
      result: `Error`
    })
  }
  console.log(`Done Get OpenAi`)
})
app.get('/history', (req, res) => {
  // res.status(200).sendFile('./public/riwayat-file.html');
  res.sendFile(path.join(__dirname, 'public', 'riwayat-file.html'));

});

app.get('/jumlah', (req, res) => {
  res.status(200).sendFile('./public/jumlah.html');
});

app.get('/files', (req, res) => {
  fs.readdir('./public/file', (err, files) => {
    if (err) return res.status(500).json({
      status: false,
      message: "Error reading file directory"
    });

    const result = files.map(filename => ({
      filename: filename,
      url: `${baseURL}/file/${filename}`,
      size: formatBytes(fs.statSync(`./public/file/${filename}`).size)
    }));

    res.status(200).json({
      status: true,
      result: result
    });
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file.path) return res.status(400).json({
    status: false,
    message: "No file uploaded"
  });

  res.status(200).json({
    info: `Silahkan kembali, atau buka link ${baseURL}/history`,
    status: true,
    result: {
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: formatBytes(req.file.size),
      url: `${baseURL}/file/` + req.file.filename
    }
  });
}, (error, req, res, next) => {
  res.status(400).json({
    error: error.message
  });
});

app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/file', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to delete the file",
      });
    }

    res.status(200).json({
      status: true,
      message: "File deleted successfully",
    });
  });
});

app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/file', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to delete the file",
      });
    }

    res.status(200).json({
      status: true,
      message: "File deleted successfully",
    });
  });
});

// Handling 404
app.use(function(req, res, next) {
  res.status(404).json({
    status: false,
    message: "Page not found",
    author: `IG: callme_kiro`
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Fungsi untuk memulai aplikasi utama
var isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;
  let args = [join(__dirname, file), ...process.argv.slice(2)];
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['magenta']
  });
  say('⸙ MEMUAT SOURCE...', {
    font: 'console',
    align: 'center',
    colors: ['blue']
  });
  say('⸙ MEMUAT PLUGINS...', {
    font: 'console',
    align: 'center',
    colors: ['blue']
  });
  say('✅ DONE !', {
    font: 'console',
    align: 'center',
    colors: ['white']
  });
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  });
  let p = fork();
  p.on('message', data => {
    console.log('[RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[❗] Exited with code:', code);
    if (code === 0) return;
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim());
    });
  // console.log(p)
}

start('main.js');
