let handler  = async (m, { conn, usedPrefix: _p }) => {
  conn.reply(m.chat, `
Iya sama sama\nSemoga keluarga yang ditinggal diberi kekuatan lahir dan batin
`.trim(), m)
}
handler.command = /^(thanks)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

export default handler
