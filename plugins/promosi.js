let handler = async (m, { conn, usedPrefix, __dirname, text, command }) => {
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

conn.sendHydrated(m.chat, `
*『 JADI BOT SPESIAL BULAN FEBRUARI 』*
  
Jadi Bot Termurah mulai dari 20,000 Rupiah selama 1 bulan
______________________________

*› SYARAT JADI BOT🔥*
1. SIAP KAN AKUN GOOGLE BUAT BIKIN SERVER NYA NANTI
2. HARUS ADA 2 HP, YAKAN BISA PINJAM KE ORTU
3. SIAPKAN NOMOR YG UNTUK DI JADIKAN BOT
4. KALO SUDAH READY ADMIN KAMI AKAN MENGIRIM QR CODE, DURASI SCAN 15 DETIK, KALO GAGAL ?  KAMI AKAN MENGIRIMKAN QR BARU MISAL TERJADI SEPERTI ITU !!
5. PROSES GA SAMPE 3 MENIT, KECUALI ADA KENDALA

> KALO BOT MATI MATI TERUS GIMANA MIN
> UANG AKAN SAYA KEMBALIKAN
> BOT ON 24 JAM
> FITUR BANYAK
> FRESH RESPON

Minat Hubungi Saya
wa.me/628575681298
${readMore}
*> METODE PEMBAYARAN 📮*
⫹⫺ Via Dana
⫹⫺ Via Gopay 
⫹⫺ Via Ovo
⫹⫺ Via Spay
`, ''.trim(), giflogo2, '', '', null, null, [
[``, ''],
[``, '']
], m,)
}

handler.command = /^(jadibot)$/i
handler.tags = ['main']
handler.help =['jadibot']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)