import { sticker } from '../lib/sticker.js'
import axios from 'axios'
var handler = async (m, { conn, args, command }) => {
  global.nama = `${conn.getName(m.sender)}`
  var text
  if (args.length >= 1) {
    text = args.slice(0).join(" ")
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text
  } else throw `Masukkan text,\ncontoh: *.${command} Kyro ganteng*`
  if (!text) return m.reply('masukan text')

  var randomColor = ['#ffffff'];

  var apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];

  var pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png')

  const obj = {
    "type": "quote",
    "format": "png",
    "backgroundColor": apiColor,
    "width": 512,
    "height": 768,
    "scale": 2,
    "messages": [{
      "entities": [],
      "avatar": true,
      "from": {
        "id": 1,
        "name": m.name,
        "photo": {
          "url": pp
        }
      },
      "text": text,
      "replyMessage": {}
    }]
  }
  const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const buffer = Buffer.from(json.data.result.image, 'base64')
  let stiker = await sticker(buffer, false, global.nama, 'IG: @callme_kiro')
  if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
  console.log(json)
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc|chat)$/i

export default handler 