import fetch from 'node-fetch'

let handler = async (m, { conn, command, usedPrefix }) => {
	let ne = await (await fetch(`https://raw.githubusercontent.com/ManagementMD/database/main/nsfw/${command}.json`)).json()
    let neko = pickRandom(ne)
	const str = `${command}`;
const str2 = str.charAt(0).toUpperCase() + str.slice(1);
let text = `Nih ${str2} nya kak`
	// conn.sendButton(m.chat, text, wm, neko, [['Next',`${usedPrefix}${command}`]],m)
    conn.sendFile(m.chat, neko, `${command}-error.jpg`, text, m)

//	conn.sendButton(m.chat, 'Waifu nya om (≧ω≦)', wm, await(await fetch(url)).buffer(), [['🔁Next🔁',`.${command}`]],m)
}
handler.command = /^(ahegao|ass|bdsm|blowjob|cuckold|cum|eba|ero|femdom|foot|gangbang|gifs|glasses|hentaivid|jahy|manga|masturbation|neko|neko2|nsfwloli|orgy|panties|pussy|tentacles|thighs|yuri|zettai)$/i
handler.tags = ['nsfw']
handler.help = ['ahegao', 'ass', 'bdsm', 'blowjob', 'cuckold', 'cum', 'eba', 'ero', 'fendom', 'foot', 'gangbang', 'gifs', 'glasses', 'hentaivid', 'jahy', 'manga', 'masturbation', 'neko', 'neko2', 'nsfwloli', 'orgy', 'panties', 'pussy', 'tentacles', 'thighs', 'yuri', 'zettai']
handler.private = true
handler.limit = true

export default handler
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}