let handler = async (m, { conn, groupMetadata, usedPrefix, text, command }) => {
    if (!text && !m.quoted) return m.reply("Input text\nReply pesan");

    let get = groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    let count = get.length;
    let sentCount = 0;

    m.reply("Wait..."); // Assuming 'wait' is defined somewhere in your code.

    for (let i = 0; i < get.length; i++) {
        setTimeout(async function () {
            try {
                if (text) {
                    await conn.sendMessage(get[i], { text: text });
                } else if (m.quoted) {
                    await conn.copyNForward(get[i], m.quoted, false);
                } else {
                    // This part of the code seems unnecessary. If you want to send both text and quoted text, you can modify accordingly.
                    m.reply("Invalid combination of text and quoted message.");
                    return;
                }

                count--;
                sentCount++;

                if (count === 0) {
                    m.reply(`Berhasil Push Kontak:\nJumlah Pesan Terkirim: *${sentCount}*`);
                }
            } catch (error) {
                console.error(`Error sending message to ${get[i]}: ${error}`);
                count--; // Decrease count even if there's an error to prevent infinite loop.
            }
        }, 15000 * i); // 15 seconds delay between each message.
    }
};

handler.command = handler.help = ["dm"];
handler.tags = ["owner"];
handler.owner = true;
handler.group = true;

export default handler;
