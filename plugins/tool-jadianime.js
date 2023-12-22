import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadImage(img)
let res2 = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${global.lolkey}&img=${url}` // INI APIKEY BUATT KIRIM FILE PDF NYA
let txt = `*Nih kak*`
await conn.sendFile(m.chat, res2, `Anime Convert.jpg`, txt.trim(), m)
}
handler.help = ['jadianime (reply media)', 'toanime (reply media)']
handler.tags = ['tools']
handler.premium = true
handler.command = /^(toanime|jadianime)/i
export default handler