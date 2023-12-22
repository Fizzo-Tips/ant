import { Configuration, OpenAIApi } from "openai";
let handler = async (m, { conn, text }) => {
  if (!text) throw "[!] Masukkan teks."
  const configuration = new Configuration({
    apiKey: "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"
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Aku Adalah KiBOT, Yang Di Kembangkan Oleh Kiro" },
      { role: "user", content: text }
    ]
  });
  m.reply(response.data.choices[0].message.content)

}
handler.help = ['ai', 'openai']
handler.tags = ['info', 'fun']
handler.command = /^(ai|openai|ro)$/i
handler.limit = 3
export default handler
