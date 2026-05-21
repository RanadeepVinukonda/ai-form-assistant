import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"
import { auth, googleProvider, db } from "../lib/firebase"
import { doc, setDoc, getDoc } from "@firebase/firestore"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken()
        localStorage.setItem("firebase_token", token)
        const snap = await getDoc(doc(db, "users", firebaseUser.uid))
        setProfile(snap.exists() ? snap.data() : { tier: "free", locale: "en" })
      } else {
        localStorage.removeItem("firebase_token")
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    const userDoc = { email: result.user.email, name: result.user.displayName, tier: "free", locale: "en", createdAt: new Date().toISOString() }
    await setDoc(doc(db, "users", result.user.uid), userDoc, { merge: true })
    setProfile(userDoc)
    return result.user
  }

  async function signUpWithEmail(email, password, name) {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const userDoc = { email, name, tier: "free", locale: "en", createdAt: new Date().toISOString() }
    await setDoc(doc(db, "users", result.user.uid), userDoc)
    setProfile(userDoc)
    return result.user
  }

  async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
    localStorage.removeItem("firebase_token")
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be inside AuthProvider")
  return ctx
}
