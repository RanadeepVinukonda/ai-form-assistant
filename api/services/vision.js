const OpenAI = require("openai")

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
})

const VISION_MODEL = process.env.OPENROUTER_VISION_MODEL || "openrouter/free"

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
    max_tokens: 4096,
  })
  return res.choices[0].message.content || ""
}

async function extractStructured(base64Images, formSchema) {
  const prompt = `Extract information from the provided document images and return a JSON object matching this form schema: ${JSON.stringify(formSchema)}. Only include fields that have visible data. Return valid JSON only, no markdown.`
  const content = [
    { type: "text", text: prompt },
    ...base64Images.map((img) => ({
      type: "image_url",
      image_url: { url: `data:${img.mime};base64,${img.data}` },
    })),
  ]
  const res = await client.chat.completions.create({
    model: VISION_MODEL,
    messages: [{ role: "user", content }],
    max_tokens: 8192,
  })
  const raw = res.choices[0].message.content || "{}"
  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim())
  } catch {
    return { raw }
  }
}

module.exports = { extractText, extractStructured }
