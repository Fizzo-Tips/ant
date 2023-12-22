import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@whiskeysockets/baileys')).default
let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
let handler = async (m, {conn}) => {
 let name = conn.getName(m.sender)
const vcard = `BEGIN:VCARD
VERSION:3.0
N:;;;
FN: Kiro (My Owner)
item.ORG: ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ
item1.TEL;waid=${nomorown}:${nomorown}@s.whatsapp.net
item1.X-ABLabel: ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ
item2.TEL;waid=${nomorbot}:${nomorbot}@s.whatsapp.net
item2.X-ABLabel: ɴᴏᴍᴏʀ ʙᴏᴛ
END:VCARD`
const sentMsg  = await conn.sendMessage(
    m.chat,
    { 
        contacts: { 
            displayName: 'OWNER BOT', 
            contacts: [{ vcard }]  
        }
    }
)
let jarot = 'https://telegra.ph/file/1b4913c4196e640732efa.jpg'
let shoota = await (await fetch('https://raw.githubusercontent.com/ManagementMD/database/main/anime/shota.json')).json()
let img = pickRandom(shoota)
let caption =
`––––『 OWNER 』––––\n
Hallo Kak, @${m.sender.split`@`[0]} 👋
Itu nomor owner Pemilik saya kak, jangan di spam ya
- Kalau mau disave syarat nya harus pakai profile Sendiri
- Kalau gak ada profile gak bakalan direspon
- Jika penting langsung chat Owner`
let footer = 'Btw dia -1 Ayang rill loh\n\n o(〃＾▽＾〃)o'
conn.sendButton(m.chat, caption, footer, img, [['Menu', '.menu'],['Donasi', '.donasi']], m, { mentions: conn.parseMention(caption) })
  }
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

export default handler
// Function style
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat dinihari 🌆"
  if (time >= 4) {
      res = "Selamat pagi 🌄"
  }
  if (time > 10) {
      res = "Selamat siang ☀️"
  }
  if (time >= 15) {
      res = "Selamat sore 🌇"
  }
  if (time >= 18) {
      res = "Selamat malam 🌙"
  }
  return res
}
