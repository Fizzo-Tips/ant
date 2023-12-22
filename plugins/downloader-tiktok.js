import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `[ *TIKTOK* ]\n\nCara penggunaan nya ${usedPrefix}${command} <link tiktok>\n\n_Tanpa tanda kurung_`
  try {
    const tiktokUrl = args[0];
    const response = await fetch(`https://www.tikwm.com/api/?url=https://vm.tiktok.com/ZSNf3G8kf/${tiktokUrl}`);
    const result = await response.json();

    if (result.code === 0 && result.data) {
      const data = result.data;
      const mediaType = data.duration > 0 ? "video" : "image";
      const fileName = `tiktok.${mediaType}`;
      const fileBuffer = await getBuffer(data.play);

      const caption = `${data.title}

Author: @${data.author.nickname}
Like: ${formatNumber(data.digg_count)}
Comment: ${formatNumber(data.comment_count)}
      `;

      conn.sendFile(m.chat, fileBuffer, fileName, caption, m);
    } else {
      m.reply("Tidak dapat mengunduh video TikTok.");
    }
  } catch (err) {
    console.error(err);
    m.reply("Link invalid/tidak sesuai.");
  }
};

handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt)$/i;

export default handler;

// Fungsi untuk mengambil buffer dari URL atau file
async function getBuffer(url) {
  const res = await fetch(url);
  const buffer = await res.buffer();
  return buffer;
}

function formatNumber(number) {
  const symbols = ['', 'K', 'M', 'B', 'T'];

  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  if (tier === 0) return number;

  const suffix = symbols[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}