const OpenAI = require("openai")

const OR_KEY = process.env.OPENROUTER_API_KEY || ""
const GM_KEY = process.env.GEMINI_API_KEY || ""

let orClient = null
if (OR_KEY) {
  orClient = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OR_KEY,
    timeout: 8000,
    maxRetries: 0,
  })
}

async function extractViaOpenRouter(imageBase64, mimeType) {
  const model = process.env.OPENROUTER_VISION_MODEL || "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free"
  const res = await orClient.chat.completions.create({
    model,
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

async function extractViaGemini(imageBase64, mimeType) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GM_KEY}`
  const body = {
    contents: [{
      parts: [
        { text: "Extract all visible text from this image. Return ONLY the extracted text — no preamble, no explanation, no markdown. Preserve line breaks and structure as close to the original as possible." },
        { inlineData: { mimeType, data: imageBase64 } },
      ],
    }],
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) {
    const errText = await res.text().catch(() => "")
    throw new Error(`Gemini API error (${res.status}): ${errText.slice(0, 200)}`)
  }
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

async function extractText(imageBase64, mimeType) {
  let lastError = null

  if (orClient) {
    try {
      return await extractViaOpenRouter(imageBase64, mimeType)
    } catch (err) {
      lastError = err
    }
  }

  if (GM_KEY) {
    try {
      return await extractViaGemini(imageBase64, mimeType)
    } catch (err) {
      lastError = err
    }
  }

  if (!OR_KEY && !GM_KEY) {
    throw new Error("No AI API key configured. Set OPENROUTER_API_KEY or GEMINI_API_KEY in Vercel environment variables.")
  }

  throw new Error(`AI vision unavailable. OpenRouter: ${lastError?.message || "not configured"}. Gemini: ${!GM_KEY ? "not configured" : "also failed"}.`)
}

module.exports = { extractText }
