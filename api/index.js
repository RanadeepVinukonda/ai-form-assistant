const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const userFormRoutes = require("./routes/userFormRoutes")
const chatRoutes = require("./routes/chatRoutes")
const visionRoutes = require("./routes/visionRoutes")
const analyzeRoutes = require("./routes/analyzeRoutes")
const translateRoutes = require("./routes/translateRoutes")

const app = express()

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: "50mb" }))

app.get("/api/health", (req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }))
app.use("/api/vision", visionRoutes)
app.use("/api/analyze", analyzeRoutes)
app.use("/api/user-forms", userFormRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/translate", translateRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: process.env.VERCEL_ENV === "production" ? "Internal server error" : err.message })
})

module.exports = app
