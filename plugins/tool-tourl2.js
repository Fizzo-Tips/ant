import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'

// Ganti URL tujuan unggahan ke "https://app.kiro.my.id/upload"
const uploadUrl = "https://app.kiro.my.id/upload";

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m

  // Periksa apakah q.mediaType didefinisikan dan sesuai
  if (q && q.mediaType && /image|video|audio|sticker|document/.test(q.mediaType)) {
    let media = await q.download(true)
    let data = await uploadFile(media)
    let caption = `Name: ${data.result.originalname}\nSize: ${data.result.size}\nType: ${data.result.mimetype}\n${data.result.url}`
    m.reply(`_UPLOAD V2 by *KIBOT*_\n\n*Link:* ${caption}`)
  } else {
    throw 'Tidak ada media yang di reply\nReply gambar/video yang ingin di upload'
  }
}

handler.help = ['upload2 (reply media)', 'tourl2 (reply media)']
handler.tags = ['tools']
handler.command = /^(tourl2|upload2)$/i

export default handler

async function uploadFile(path) {
  let form = new FormData()
  form.append('file', fs.createReadStream(path)) // Menggunakan 'file' sebagai nama field

  // Ganti URL dan method ke POST
  let res = await (await fetch(uploadUrl, {
    method: 'POST',
    body: form,
  })).json()
  await fs.promises.unlink(path)
  return res
}
