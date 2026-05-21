const express = require("express")
const router = express.Router()
const { extractText } = require("../services/vision")

router.post("/extract", async (req, res) => {
  try {
    const { image, mime } = req.body
    if (!image || !mime) {
      return res.status(400).json({ error: "image (base64) and mime are required" })
    }
    const text = await extractText(image, mime)
    res.json({ text })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
