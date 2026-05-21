const express = require("express")
const router = express.Router()
const { extractText } = require("../services/vision")

router.post("/extract", async (req, res) => {
  try {
    const { image, mime } = req.body
    if (!image || !mime) {
      return res.status(400).json({ error: "image (base64) and mime are required" })
    }
    const text = await Promise.race([
      extractText(image, mime),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Vision API timed out")), 9000)),
    ])
    if (text) return res.json({ text })
    res.status(500).json({ error: "Vision extraction returned empty result" })
  } catch (err) {
    const msg = err.message || "Unknown error"
    if (msg.includes("timed out") || msg.includes("timeout") || msg.includes("TIMEOUT")) {
      return res.status(504).json({ error: "AI vision service timed out. Please try again or use a smaller/clearer image." })
    }
    if (msg.includes("No endpoints found") || msg.includes("Insufficient balance") || msg.includes("free tier")) {
      return res.status(503).json({ error: "AI vision service is temporarily unavailable. Please try again later." })
    }
    res.status(500).json({ error: msg })
  }
})

module.exports = router
