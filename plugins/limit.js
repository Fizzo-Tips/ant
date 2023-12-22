let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let caption = `Sisa limit *@${who.split("@")[0]}* adalah ${global.db.data.users[who].limit}`
  //  m.reply(caption, { mentions: conn.parseMention(caption) })
await conn.reply(m.chat, caption, m, { mentions: conn.parseMention(caption) })

}
handler.help = ['limit [@user]']
handler.tags = ['main']
handler.command = /^(limit)$/i
export default handler 