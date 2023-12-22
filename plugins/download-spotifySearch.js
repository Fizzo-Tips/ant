import fetch from 'node-fetch';

let handler = async (m, { conn, command, usedPrefix, args }) => {
  if (!args[0]) throw `mau cari apa..?\nContoh : ${usedPrefix}${command} putri iklan`;
  m.reply('Mengambil data');

  const url = `https://spotifyku.my.id/search?query=${args[0]}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === true && data.data) {
        let totalData = data.data.length; // Jumlah data yang ditemukan
        let caption = `Ditemukan ${totalData} lagu.\n┏┉━━━━━━━━━━━❏
┆ *SPOTIFY MP3 SEARCH*`;


        // Loop melalui semua data dalam array 'data'
        for (let i = 0; i < totalData; i++) {
          const item = data.data[i];

          // Tambahkan informasi dari setiap elemen ke dalam caption
          caption += `\n├┈┈┈┈┈┈┈┈┈┈┈
┆• *Judul:* ${item.title}
┆• *Type:* MP3
┆• *Durasi:* ${item.duration}
└❏`;
        }

        // Kirim caption yang berisi semua data dan jumlah data sebagai pesan balasan
        m.reply(caption);
      } else {
        m.reply('Data tidak ditemukan.');
      }
    })
    .catch(error => {
      m.reply('Terjadi kesalahan: ' + error);
    });
}

handler.help = ['spotifydl <teks>'];
handler.tags = ['downloader'];
handler.command = /^(spotifysearch|spotifycari)$/i;
handler.limit = true;

export default handler;
