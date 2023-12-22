let handler = async (m, { conn, text, usedPrefix }) => {
  let [number, nama, pesan] = text.split('|');
  if ((!number || !nama || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Wajan|Halo.`;
  number = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  let data = (await conn.onWhatsApp(number))[0] || {};
  if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
  if (number == m.sender) throw 'tidak bisa mengirim pesan menfess ke diri sendiri.'
  if (text > 500) return conn.reply(m.chat, 'Teks Kepanjangan!', m)

  // Mengirim Pesan di Korban
  let spam1 = `*「 📧 MENFES 」*\n\n📫Dari : ${nama}\n💬Pesan : ${pesan}\n\n *app.kiro.my.id*`
  conn.reply(data.jid, spam1, m)

  // Pemberitahuan jika di menfes nay berhasil dikirim
  let logs = `[!] KiBOT Berhasil mengrirm menfess ke nomor ${data}`
  conn.reply(m.chat, logs, m)
}
handler.tags = ['Menfess']
handler.help = ['menfess', 'mfs', 'confes'].map(v => v + ' <nomor|nama pengirim|pesan>')
handler.command = /^(mfs|menfess|menfes|confes|confess)$/i
handler.private = true
handler.limit = true

export default handler
