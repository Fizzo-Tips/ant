import fetch from 'node-fetch'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
  let name = await conn.getName(who);
  let stickauth = 'Nama Pengguna Default'; // Ganti ini dengan nilai yang sesuai

  try {
    let [packname, ...author] = args.join` `.split`|`;
    author = (author || []).join`|`;
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp/g.test(mime)) {
      let img = await q.download?.();
      stiker = await addExif(img, packname || '', author || '');
    } else if (/image/g.test(mime)) {
      let img = await q.download?.();
      stiker = await createSticker(img, false, packname, author, 20, name);
    } else if (/video/g.test(mime)) {
      // Jika perlu, tambahkan batasan waktu di sini.
      let img = await q.download?.();
      stiker = await mp4ToWebp(img, { pack: packname, author: author }, name);
    } else if (args[0] && isUrl(args[0])) {
      stiker = await createSticker(false, args[0], '', author, 20, name);
    } else {
      throw `Reply dengan gambar/video/stiker menggunakan perintah ${usedPrefix + command}`;
    }
  } catch (e) {
    console.log(e);
    stiker = e;
  } finally {
    conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null, {
      fileLength: 100,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaUrl: sgc, // Ganti ini dengan URL yang sesuai
          mediaType: 2,
          description: 'KiBOT',
          title: 'Gabung dong kak ' + name,
          body: botdate, // Ganti ini dengan isi pesan yang sesuai
          thumbnail: await (await fetch(pp)).buffer(),
          sourceUrl: sgc // Ganti ini dengan URL yang sesuai
        }
      }
    });
  }
}

handler.help = ['stiker', 's'];
handler.tags = ['sticker'];
handler.alias = ['stiker', 'sticker', 'sgif', 'stikergif', 'stickergif'];
handler.command = /^s(tic?ker)?(gif)?$/i;

export default handler;

const isUrl = (text) =>
  text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );

async function createSticker(img, url, packName, authorName, quality, name) {
  let stickerMetadata = {
    type: 'full',
    pack: name,
    author: stickauth,
    quality
  };
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}

async function mp4ToWebp(file, stickerMetadata, name) {
  if (stickerMetadata) {
    if (!stickerMetadata.pack) stickerMetadata.pack = '‎';
    if (!stickerMetadata.author) stickerMetadata.author = '‎';
    if (!stickerMetadata.crop) stickerMetadata.crop = false;
  } else if (!stickerMetadata) {
    stickerMetadata = { pack: '‎', author: '‎', crop: false };
  }
  let getBase64 = file.toString('base64');
  const Format = {
    file: `data:video/mp4;base64,${getBase64}`,
    processOptions: {
      crop: stickerMetadata?.crop,
      startTime: '00:00:00.0',
      endTime: '00:00:7.0',
      loop: 0
    },
    stickerMetadata: {
      ...stickerMetadata
    },
    sessionInfo: {
      WA_VERSION: '2.2106.5',
      PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
      WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11',
      BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190',
      OS: 'Windows Server 2016',
      START_TS: 1614310326309,
      NUM: '6247',
      LAUNCH_TIME_MS: 7934,
      PHONE_VERSION: '2.20.205.16'
    },
    config: {
      sessionId: 'session',
      headless: true,
      qrTimeout: 20,
      authTimeout: 0,
      cacheEnabled: false,
      useChrome: true,
      killProcessOnBrowserClose: true,
      throwErrorOnTosBlock: false,
      chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
      ],
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      skipBrokenMethodsCheck: true,
      stickerServerEndpoint: true
    }
  };
  let res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application.json;charset=utf-8'
    },
    body: JSON.stringify(Format)
  });
  return Buffer.from((await res.text()).split(';base64,')[1], 'base64');
}