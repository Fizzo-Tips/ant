import fetch from 'node-fetch'

const handler = async (m, { conn, command }) => {
  try {
    let name = conn.getName(m.sender)
    let caption = `Wduhh Pecinta ${command.capitalize()} nih ${name}`
    const randomElement = await getRandomElementFromJSON()
    await conn.sendFile(m.chat, randomElement, 'ahegao-error-jpg', caption, m)
  } catch (error) {
    console.log('Error:', error)
  }
}

handler.command = /^(ahegao)$/i
handler.tags = ['anime', 'nsfw']
handler.help = ['ahegao']
handler.limit = true

export default handler

function getRandomElementFromJSON() {
  return new Promise((resolve, reject) => {
    fetch('https://raw.githubusercontent.com/ManagementMD/database/main/anime/ahegao.json')
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
