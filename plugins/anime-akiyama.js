import fetch from 'node-fetch'

const handler = async (m, { conn, command }) => {
  try {
    let name = conn.getName(m.sender)
    let caption = `Pasti waifunya ${command.capitalize()}, yah gak ${name} ?`
    const randomElement = await getRandomElementFromJSON()
    await conn.sendFile(m.chat, randomElement, `${command}-error-jpg'`, caption, m)
  } catch (error) {
    console.log('Error:', error)
  }
}

handler.command = /^(akiyama)$/i
handler.tags = ['anime']
handler.help = ['akiyama']
handler.limit = true

export default handler

function getRandomElementFromJSON() {
  return new Promise((resolve, reject) => {
    fetch('https://github.com/ManagementMD/database/raw/main/anime/akiyama.json')
      .then(response => response.json())
      .then(json => {
        const randomIndex = Math.floor(Math.random() * json.length)
        const randomElement = json[randomIndex]
        resolve(randomElement)
      })
      .catch(error => {
        reject(error)
      })
  })
}
