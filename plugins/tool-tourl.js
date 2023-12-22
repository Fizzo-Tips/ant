import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang di reply\nReply gambar/video yang ingin di upload'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`_UPLOAD V1 by *KIBOT*_\n\n*Link:*
${link}
*Size:* ${media.length} Byte
*Expired:* ${isTele ? 'No Expiry Date' : 'Unknown'}`)
}
handler.help = ['upload (reply media)', 'tourl (reply media)']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i

export default handler
