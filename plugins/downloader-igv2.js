import snapsave from "snapsave-downloader2";


let handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) {
    throw `Gunakan contoh ${usedPrefix}${command} https://www.instagram.com/tv/CdmYaq3LAYo/`
  }

  try {
    const result = await snapsave(args[0]);
    for (let i of result.data) {
      if (i.thumbnail && i.url) {
        // Mengirim thumbnail sebagai gambar dan URL sebagai file
        conn.sendFile(m.chat, i.url, 'video.mp4', '@callme_kiro', m);
      } else {
        m.reply('Tidak dapat menemukan thumbnail atau URL yang valid.');
      }
    }
  } catch (err) {
    console.error(err);
    m.reply("Terjadi kesalahan, silakan coba lagi.");
  }
};

handler.help = ['instagram <link ig>'];
handler.tags = ['downloader'];
handler.command = /^(ig|igdl)$/i;

export default handler;
