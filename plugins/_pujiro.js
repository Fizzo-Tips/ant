let handler  = async (m, { conn, groupMetadata, usedPrefix: _p }) => {
    let info = ``.trim()
    
    conn.fakeReply(m.chat, info, '0@s.whatsapp.net', 'Kan udah gw bilang, KIBOT emang The Best', `${groupMetadata.id}`)
    }
    handler.command = /^(pujiro)$/i
    
    handler.owner = false
    handler.mods = false
    handler.premium = false
    handler.group = false
    handler.private = false
    
    handler.admin = false
    handler.botAdmin = false
    
    handler.fail = null
    
    export default handler 
     
    