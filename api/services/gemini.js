const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

async function generateExplanation(formSlug, fieldId) {
  const prompt = `You are an expert assistant helping someone fill out a government form. Explain what information is needed for the field "${fieldId}" in the form "${formSlug}". Keep it concise (2-3 sentences), helpful, and practical.`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function generateSuggestion(formSlug, fieldId, formData) {
  const context = JSON.stringify(formData)
  const prompt = `You are helping fill form "${formSlug}". Given the user has already entered: ${context}. Suggest a likely value for the field "${fieldId}" based on common patterns. Return ONLY the suggested value, no explanation.`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function chatReply(messages, formContext) {
  const context = formContext ? `The user is working on form: ${JSON.stringify(formContext)}.` : ""
  const history = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))
  const chat = model.startChat({ history })
  const result = await chat.sendMessage(
    `You are a helpful assistant specializing in government forms, visa applications, tax returns, and official documents. Answer questions clearly and accurately. ${context}`
  )
  return result.response.text()
}

async function autoFillFromOCR(formSlug, extractedText, language) {
  const prompt = `Extract and organize information from the following OCR text. Return a JSON object with field names and values that would go into form "${formSlug}":\n\n${extractedText}`
  const result = await model.generateContent(prompt)
  try {
    return JSON.parse(result.response.text().replace(/```json|```/g, ""))
  } catch {
    return { raw: result.response.text() }
  }
}

module.exports = { generateExplanation, generateSuggestion, chatReply, autoFillFromOCR }
