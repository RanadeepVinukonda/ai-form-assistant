const express = require("express")
const router = express.Router()
const { auth, db } = require("../config/firebase")
const authenticate = require("../middleware/auth")

router.use(authenticate)

router.get("/", async (req, res) => {
  const snapshot = await db.collection("userForms").where("userId", "==", req.user.uid).get()
  const forms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  res.json(forms)
})

router.get("/:id", async (req, res) => {
  const doc = await db.collection("userForms").doc(req.params.id).get()
  if (!doc.exists) return res.status(404).json({ error: "Form not found" })
  res.json({ id: doc.id, ...doc.data() })
})

router.post("/", async (req, res) => {
  const doc = await db.collection("userForms").add({
    ...req.body,
    userId: req.user.uid,
    updatedAt: new Date().toISOString(),
  })
  res.json({ id: doc.id })
})

router.delete("/:id", async (req, res) => {
  await db.collection("userForms").doc(req.params.id).delete()
  res.json({ success: true })
})

module.exports = router
