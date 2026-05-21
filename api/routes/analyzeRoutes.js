const express = require("express")
const router = express.Router()
const { analyzeDocument, generateFieldExplanation, generateFieldSuggestion } = require("../services/analyze")

router.post("/", async (req, res) => {
  try {
    const { text } = req.body
    if (!text?.trim()) {
      return res.status(400).json({ error: "text is required" })
    }
    const result = await analyzeDocument(text)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/explain", async (req, res) => {
  try {
    const { fieldLabel, documentTitle } = req.body
    if (!fieldLabel) return res.status(400).json({ error: "fieldLabel is required" })
    const explanation = await generateFieldExplanation(fieldLabel, documentTitle || "document")
    res.json({ explanation })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/suggest", async (req, res) => {
  try {
    const { fieldLabel, documentTitle, otherFields } = req.body
    if (!fieldLabel) return res.status(400).json({ error: "fieldLabel is required" })
    const suggestion = await generateFieldSuggestion(fieldLabel, documentTitle || "document", otherFields || {})
    res.json({ suggestion })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
