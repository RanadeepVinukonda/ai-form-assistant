const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const { generateExplanation, generateSuggestion } = require("../services/gemini")

const schemasDir = path.join(__dirname, "../../shared/form-schemas")
const metadataPath = path.join(schemasDir, "form-metadata.json")
const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"))

router.get("/", (req, res) => {
  const { category } = req.query
  const forms = Object.values(metadata)
  res.json(category ? forms.filter((f) => f.category === category) : forms)
})

router.get("/:slug", (req, res) => {
  const form = metadata[req.params.slug]
  if (!form) return res.status(404).json({ error: "Form not found" })
  res.json(form)
})

router.post("/:slug/explain", async (req, res) => {
  try {
    const { fieldId } = req.body
    const explanation = await generateExplanation(req.params.slug, fieldId)
    res.json({ explanation })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/:slug/suggest", async (req, res) => {
  try {
    const { fieldId, formData } = req.body
    const suggestion = await generateSuggestion(req.params.slug, fieldId, formData)
    res.json({ suggestion })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
