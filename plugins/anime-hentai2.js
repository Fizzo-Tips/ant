import { googleImage, pinterest } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
// if (db.data.chats[m.chat].nsfw == false && m.isGroup) return conn.sendButton(m.chat, '❗ ᴏᴘᴛɪᴏɴs ɴsғᴡ ᴅɪᴄʜᴀᴛ ɪɴɪ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴏʟᴇʜ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ',wm.date, null, [['ᴇɴᴀʙʟᴇ', '.on nsfw']], m)
	
    if (!text) throw `Use example ${usedPrefix}${command} Sagiri`
    const res = await (await googleImage('rule34 ' + text)).getRandom()
    conn.sendButton(m.chat, 'Khusus Yogi ASUU', wm, res, [['Next',`.${command} ${text}`]],m, {
        contextInfo: { externalAdReply :{ showAdAttribution: true,
                                sourceUrl: 'https://www.instagram.com/callme_kiro/',
                                mediaType: 2,
                                description: `Kiro Fyzu`,
                                title: `Ayo pollow`,
                                body: `Follow Ig dapat 1 Limit`,          previewType: 0,
                                thumbnail: await (await fetch(giflogo2)).buffer(),
                                // thumbnail: await (await fetch('https://yt3.ggpht.com/ytc/AMLnZu_TiUuyi7hypR1raNMMT58nODNbhuJZtoSMkDyA=s900-c-k-c0x00ffffff-no-rj')).buffer(),    // image dengan link
                                mediaUrl: 'https://www.instagram.com/callme_kiro/'
                                
                              }}
        })
    }
handler.help = ['hentai2 <character>']
handler.tags = ['anime']
handler.command = ['hentai2']

handler.limit = true

export default handler