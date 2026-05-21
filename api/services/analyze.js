const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

async function analyzeDocument(extractedText) {
  const prompt = `You are analyzing a document that a user has uploaded for a form-filling assistant. Extract all meaningful fillable fields from the text and return structured data.

For each field provide:
- id: machine-friendly snake_case identifier (e.g. "full_name", "date_of_birth", "phone_number")
- label: human-readable field name (e.g. "Full Name", "Date of Birth")
- value: the value found in the text for this field (exact match or empty string "")
- description: one-sentence plain-language explanation of what this field means
- type: the best HTML input type for this field — one of "text", "date", "email", "tel", "number", "textarea", "select"
- required: boolean — true if the field appears mandatory

Also provide:
- title: a short, descriptive title for this document (e.g. "Job Application Form", "Visa Application")
- documentType: what kind of document this appears to be (e.g. "Tax Form", "Visa Application", "Employment Form", "Registration Form", "General Document")

Rules:
- Extract ONLY fields that have visible data or are clearly part of the document structure
- DO NOT hallucinate fields that aren't present
- If the text is just a paragraph or list with no clear fields, return it as a single "textarea" field with id "content"
- If no meaningful fields found, set title to "Unrecognized Document" and documentType to "Unknown"

Return ONLY valid JSON with exactly this structure (no markdown, no explanation):
{"title":"...","documentType":"...","fields":[...]}

Document text:
${extractedText}`
  const result = await model.generateContent(prompt)
  const raw = result.response.text()
  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim())
  } catch {
    return { title: "Unrecognized Document", documentType: "Unknown", fields: [{ id: "content", label: "Document Content", value: extractedText, description: "Raw text extracted from the document", type: "textarea", required: false }] }
  }
}

async function generateFieldExplanation(fieldLabel, documentTitle) {
  const prompt = `You are a helpful assistant. Explain what information is needed for the field "${fieldLabel}" in the document "${documentTitle}". Keep it concise (2-3 sentences), helpful, and practical. For example, if the field is "Full Name", explain that it requires their legal name as it appears on government ID.`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function generateFieldSuggestion(fieldLabel, documentTitle, otherFields) {
  const context = JSON.stringify(otherFields)
  const prompt = `Given a document titled "${documentTitle}" with these already-filled fields: ${context}. Suggest a realistic and common value for the field "${fieldLabel}". Return ONLY the suggested value, no explanation. If unsure, return an empty string.`
  const result = await model.generateContent(prompt)
  return result.response.text().trim()
}

module.exports = { analyzeDocument, generateFieldExplanation, generateFieldSuggestion }
