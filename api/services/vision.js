const OpenAI = require("openai")

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  timeout: 8000,
  maxRetries: 0,
})

const VISION_MODEL = process.env.OPENROUTER_VISION_MODEL || "qwen/qwen-2.5-vl-72b-instruct:free"

async function extractText(imageBase64, mimeType) {
  const res = await client.chat.completions.create({
    model: VISION_MODEL,
    messages: [{
      role: "user",
      content: [
        { type: "text", text: "Extract all visible text from this image. Return ONLY the extracted text — no preamble, no explanation, no markdown. Preserve line breaks and structure as close to the original as possible." },
        { type: "image_url", image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
      ],
    }],
    max_tokens: 2048,
  })
  return res.choices[0].message.content || ""
}

module.exports = { extractText }
