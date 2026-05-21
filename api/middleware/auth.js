const { auth } = require("../config/firebase")

async function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No authorization token" })
  }
  try {
    const token = header.split(" ")[1]
    const decoded = await auth.verifyIdToken(token)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = authenticate
