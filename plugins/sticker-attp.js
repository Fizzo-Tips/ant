import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw 'ᴍᴀꜱᴜᴋᴋᴀɴ ᴛᴇxᴛ'
  m.reply('ᴘʀᴏꜱᴇꜱ...')
  let res = `https://api.lolhuman.xyz/api/attp2?apikey=kiroapi&text=${response[0]}`
  conn.sendFile(m.chat, res, 'kiro-attp.webp', `ꜱᴜᴅᴀʜ ᴊᴀᴅɪ`, m, false)
}
handler.help = ['attp <teks>']
handler.tags = ['sticker']
handler.stags = ['sticker']
handler.command = /^(attp)$/i
handler.premium = true

export default handler