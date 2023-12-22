import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import moment from 'moment-timezone'
import { sticker } from '../lib/sticker.js'
import fs from "fs"
const wib2 = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const wita2 = moment.tz('Asia/Makassar').format('HH:mm:ss')

let handler = async (m, { conn, args, usedPrefix, command }) => {
let caption = `
Pesan Gambar Dari PC
`
// DIBAWAH GAMBAR YANG INGIN DIKIRIMKAN KE WHATSAPP
let url = 'https://i.ibb.co/8dHDTmD/image.png'


await conn.sendHydrated(m.chat, caption, `kibot.netlify.app`, url,`${url}`, 'Link Gambarnya', null, null,[
            ], m, {
            fileLength: fsizedoc,
            seconds: fsizedoc,
            contextInfo: {
          externalAdReply :{
    mediaUrl: sig,
    mediaType: 2,
    description: wm, 
    title: bottime,
    body: botdate,
    thumbnail: await(await fetch(giflogo2)).buffer(),
    sourceUrl: sgc
     }}
  })
}

handler.command = /^(imgpc)$/i
handler.tags = ['owner']
handler.otags = ['owner']
handler.help = ['imgpc']
handler.premium = false
handler.owner = true

export default handler

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})})