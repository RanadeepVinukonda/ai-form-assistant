const express = require("express")
const router = express.Router()
const { GoogleGenerativeAI } = require("@google/generative-ai")

router.post("/", async (req, res) => {
  try {
    const { text, targetLang } = req.body
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = `Translate the following text to ${targetLang}. Return only the translation:\n\n${text}`
    const result = await model.generateContent(prompt)
    res.json({ translation: result.response.text() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
