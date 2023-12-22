let handler = async (m, { conn }) => {    
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let user = global.db.data.users[who]
        conn.reply(m.chat, `*Sukses menambahkan limit sebanyak 1000*`, m)
        global.db.data.users[who].limit = 1000
}
handler.help = ['addlimit [@user]']
handler.tags = ['owner']
handler.command = /^(addlimit)$/i
handler.owner = true

export default handler
