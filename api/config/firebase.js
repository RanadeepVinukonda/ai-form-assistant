const admin = require("firebase-admin")

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
} else {
  admin.initializeApp({ projectId: process.env.VITE_FIREBASE_PROJECT_ID || "aiformassitant" })
}

const db = admin.firestore()
const auth = admin.auth()

module.exports = { admin, db, auth }
