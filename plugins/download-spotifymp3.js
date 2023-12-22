import fetch from 'node-fetch'
let handler = async (m, { conn, command, usedPrefix, args }) => {
  if (!args[0]) throw `Url Nya Mana..?\nContoh : ${usedPrefix}${command} https://open.spotify.com/track/3yhZQ1RAHGw8UojfLZ2qZC`
  m.reply('Mengambil data')
  let res = `https://spotifyku.my.id/download?url=${args[0]}`
  conn.sendFile(m.chat, res, 'spotify.opus', `┏┉━━━━━━━━━━━❏
┆ *SPOTIFY MP3*
├┈┈┈┈┈┈┈┈┈┈┈
┆• *Judul:* 
│• *Type:* MP3
┆• *Durasi:* 
└❏`, m, false)
}
handler.help = ['spotifydl <teks>']
handler.tags = ['downloader']
handler.command = /^(spotifydl|spotify)$/i
handler.limit = true

export default handler