const express = require("express")
const router = express.Router()
const { autoFillFromOCR } = require("../services/gemini")
const { extractText, extractStructured } = require("../services/vision")

router.post("/vision", async (req, res) => {
  try {
    const { image, mime, prompt } = req.body
    if (!image || !mime) {
      return res.status(400).json({ error: "image (base64) and mime are required" })
    }
    const text = await extractText(image, mime)
    res.json({ text })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/vision-structured", async (req, res) => {
  try {
    const { images, formSchema } = req.body
    if (!images?.length || !formSchema) {
      return res.status(400).json({ error: "images array and formSchema are required" })
    }
    const result = await extractStructured(images, formSchema)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

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
