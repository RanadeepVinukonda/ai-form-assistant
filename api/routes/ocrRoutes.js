const express = require("express")
const router = express.Router()
const { autoFillFromOCR } = require("../services/gemini")

router.post("/auto-fill", async (req, res) => {
  try {
    const { formSlug, extractedText, language } = req.body
    const result = await autoFillFromOCR(formSlug, extractedText, language)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
