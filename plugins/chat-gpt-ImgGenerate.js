import { Configuration, OpenAIApi } from 'openai';

let handler = async (m, { conn, text }) => {
if (!text) throw "[!] Masukkan teks."
    const configuration = new Configuration({
        apiKey: "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"
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createImage({
            model: "dall-e-3",
            prompt: text,
            n: 1,
            size: "1024x1024",
        });

        const imageUrl = response.data.data[0].url;
        
        // Sending the image using sendFile
        conn.sendFile(m.chat, imageUrl, 'generated_image.jpg', `Nih ${text}.`);

    } catch (error) {
        console.error("Error generating image:", error);
        m.reply("Error generating image. Please try again.");
    }
};

handler.help = ['generateimage', 'aiimage'];
handler.tags = ['info', 'fun'];
handler.command = /^(generateimage|aiimage)$/i;
export default handler;