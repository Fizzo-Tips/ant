import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
	let url = gamanaufal[Math.floor(Math.random() * gamanaufal.length)]
	conn.sendButton(m.chat, '*Kami seluruh Tim Kiro BOT turut berduka atas kepergian Almarhum/Almarhuma* ', wm, url, [['Thanks Bro', '.thanks']], m)
}
handler.command = /^(belasungkawa)$/i
handler.tags = ['quotes']
handler.help = ['belasungkawa']
export default handler
handler.limit = true

global.gamanaufal = [
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan1-0da361805f2f61f1510588debf4f3d3a.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan2-0f4478428c177bb69c2c4e7959fcdace.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan3-eeadc96de7a1fbbc8e33247b61b749af.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan4-78a84249708a6d8546eb876e1ad11a5f.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan5-9719cc825990e17205e82bbecc4187b3.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan6-826142c7b311d2d4a08bd3f8debb5d10.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan7-3c730911a2b065a4a1d806338f758baf.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan7-3c730911a2b065a4a1d806338f758baf.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan9-2eb16f5e32adb551dfe83ee447a8233c.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan9-2eb16f5e32adb551dfe83ee447a8233c.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan11-ef8cd098d42bbeab998973d98a8b66fb.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan12-7a53eeaf6a38a5b43cd7706adfe37ef6.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan13-4b4d40a0f03e5ae06770f2d6bd439d6f.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan14-ae3cf5cf6d5b8c5f39623d9cf8c83731.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan15-d72c74b772673e0242f9ccbbba975aa7.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan16-5db803b51f875d452af6acef9e235376.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan17-cfc0b3feea3536c0725b970ef6bf7ba1.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan18-73657a919c5bd34b445e7160c5505e98.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan19-699a6d9b99dcc25469fdbf00a2641e5b.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan20-5d0e85ddda88ab1c686bb46e36b0a9d3.jpg',
    'https://cdn.idntimes.com/content-images/post/20191127/ucapan20-5d0e85ddda88ab1c686bb46e36b0a9d3.jpg'
]