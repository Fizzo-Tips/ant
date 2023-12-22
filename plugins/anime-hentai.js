import fetch from 'node-fetch'

let handler = async (m, { conn,  }) => {
    let logo = 'https://telegra.ph/file/8003d5bea26b36620e7f6.jpg'
	let ne = await (await fetch('https://raw.githubusercontent.com/ManagementMD/scrapper/main/hentai.json')).json()
    let neko = pickRandom(ne)
	conn.sendButton(m.chat, 'b-ba-baka >//<', wm, neko, [['Next','.hentai']],m, {
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
handler.command = /^(hentai)$/i
handler.tags = ['anime']
handler.help = ['hentai']
handler.private = true
handler.limit = true
export default handler
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}