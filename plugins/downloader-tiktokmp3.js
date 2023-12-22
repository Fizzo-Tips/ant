import fs from 'fs'
import fetch from 'node-fetch'
import { Tiktok } from '@xct007/tiktok-scraper'

let handler = async (m, { conn, args, command }) => {
   if (!args[0]) throw `[ *${command.capitalize()}* ]\n\nCara penggunaannya ${usedPrefix}${command} <link tiktok>\n\n_Tanpa tanda kurung_`
   let links = await Tiktok(args[0])
   const lagu = links.download.music
  conn.sendFile(m.chat, lagu, `${command}-erro.mp3`, `Ywdah si wir`, m, false)
}
handler.help = ['ttaudio <teks>']
handler.tags = ['downloader']
handler.command = /^(ttaudio|tiktokmp3|ttmp3)$/i
handler.limit = true

export default handler