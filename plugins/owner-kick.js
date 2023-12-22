//let fs = require('fs')
import { areJidsSameUser } from '@whiskeysockets/baileys'

let handler = async (m, { conn, args, participants }) => {
 let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  let aki = m.quoted ? [m.quoted.sender] : m.mentionedJid
  let users = aki.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
  let who4 = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : `${users}`
  let wayy = '_* 𝐌𝐚𝐦𝐩𝐮𝐬 𝐝𝐢 𝐤𝐢𝐜𝐤 𝐒𝐞𝐦𝐨𝐠𝐚 𝐚𝐣𝐚 𝐃𝐢 𝐤𝐢𝐜𝐤 𝐃𝐚𝐫𝐢 𝐃𝐮𝐧𝐢𝐚 𝐣𝐮𝐠𝐚 😐'
  for (let i of users) {
  wayy += ` @${i.split('@')[0]}`
  }
  let kickedUser = []
  for (let user of users)
      if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
          const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
          kickedUser.concat(res)
          await delay(1 * 1000)
      }
let caption = `Succes Menggeluarkan @${who4.split("@")[0]}`
  m.reply(caption, null, { mentions: conn.parseMention(caption) })
  // conn.reply(m.chat, wayy, m, { contextInfo: { mentionedJid: users }})
  // for (let user of users) if (user.endsWith('@s.whatsapp.net')) await conn.groupParticipantsUpdate(m.chat, [user], "remove")
}
handler.help = ['okick'].map(v => v + ' @user')
handler.tags = ['owner']
handler.command = /^(okick|\-)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.owner = true
handler.botAdmin = true

handler.fail = null
handler.limit = false

export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
