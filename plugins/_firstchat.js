import moment from 'moment-timezone';

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await this.getName(who)
    let user = global.db.data.users[m.sender]
    let txt = `👋Hai kak ${name}, ${ucapan()}

${user.banned ? '📮Maaf, kamu dibanned & Tidak bisa menggunakan KiBOT, silahkan hubungi Owner untuk membuka banned kamu' : `💬 Ada yg bisa KiBOT bantu?\nKetik *.menu* unruk menampilkan fitur yang tersedia`}`.trim()

    if (new Date() - user.pc < 21600000) return // waktu ori 21600000 (6 jam)
    
    // Use m.reply instead of this.sendButton
    await m.reply(txt, null, { contextInfo: { mentionedJid: user.banned ? [user] : [] } });
    
    user.pc = new Date * 1
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
