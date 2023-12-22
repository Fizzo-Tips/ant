import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
  let response = args.join(' ').split('|')
 if (!args[0]) throw 'ᴍᴀꜱᴜᴋᴋᴀɴ ᴛᴇxᴛ'
 m.reply('ᴘʀᴏꜱᴇꜱ...')
 let res = `https://saipulanuar.ga/api/maker/ttp2?text=${response[0]}`
 let stiker = await sticker(null, res, 'KIBOT TTP', '@callme_kiro')
conn.sendFile(m.chat, stiker, null, { asSticker: true })
}

handler.help = ['ttp <teks>']
handler.tags = ['sticker']
handler.command = /^(ttp)$/i
handler.limit = true
export default handler
