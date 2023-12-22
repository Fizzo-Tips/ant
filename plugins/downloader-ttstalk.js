import { TiktokStalk } from "@tobyg74/tiktok-api-dl";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukkan username yang ingin di stalk contoh\n*${usedPrefix}${command} kirofyzu*`
  const username = args[0];

  try {
    const result = await TiktokStalk(username);

    if (result.status === 'success' && result.result) {
      const users = result.result.users;
      const stats = result.result.stats;

      const caption = `Username: @${users.username}
Nickname: ${users.nickname}
Signature: ${users.signature}
Verified: ${users.verified ? 'Yes' : 'No'}
Private Account: ${users.privateAccount ? 'Yes' : 'No'}
Region: ${users.region}
Commerce User: ${users.commerceUser ? 'Yes' : 'No'}
Followers: ${stats.followerCount}
Following: ${stats.followingCount}
Hearts: ${stats.heartCount}
Videos: ${stats.videoCount}
Likes: ${stats.likeCount}
Friends: ${stats.friendCount}`;

      // Mengirim avatarMedium sebagai gambar
      conn.sendFile(m.chat, users.avatarMedium, 'avatar.jpg', caption, m);
    } else {
      m.reply("Gagal mendapatkan informasi stalker TikTok.");
    }
  } catch (err) {
    console.error(err);
    m.reply("Terjadi kesalahan, silakan coba lagi.");
  }
};

handler.help = ['tiktokstalk', 'ttstalk', 'stalktt'];
handler.tags = ['tools'];
handler.alias = ['tiktokstalk', 'ttstalk', 'stalktt'];
handler.command = /^(tiktokstalk|ttstalk|stalktt)$/i;

export default handler;
