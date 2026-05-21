const express = require("express")
const router = express.Router()
const { chatReply } = require("../services/gemini")

router.post("/", async (req, res) => {
  try {
    const { messages, formContext } = req.body
    const reply = await chatReply(messages, formContext)
    res.json({ reply })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
