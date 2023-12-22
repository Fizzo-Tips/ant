import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let pp = await this.profilePictureUrl(user, 'image')
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await pp.download()
    let url = await uploadImage(img)
let res = `https://api.lolhuman.xyz/api/convert/imgtopdf?apikey=${global.lolkey}&img=${url}` // INI APIKEY BUATT KIRIM FILE PDF NYA
let txt = `Link Gambar ${url}\nConvert By KIBOT`
await conn.sendFile(m.chat, res, `KIBOT IMG_to_PDF.pdf`, txt.trim(), m)
        }
        
handler.premium = true
handler.command = /^(imgtopdf)/i
export default handler