import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button, Card } from "../components/ui"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
  const { signInWithGoogle, signUpWithEmail, signInWithEmail } = useAuth()
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (mode === "signup") await signUpWithEmail(email, password, name)
      else await signInWithEmail(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(.*\)/, ""))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    try {
      await signInWithGoogle()
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="section-container py-16 max-w-md mx-auto">
      <Helmet><title>{mode === "login" ? "Sign In" : "Sign Up"} — AI Form Assistant</title></Helmet>

      <Card className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-sm text-gray-500 mt-1">{mode === "login" ? "Sign in to continue your forms" : "Save forms and track progress"}</p>
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <div className="relative">
            <input type={showPwd ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full h-10 px-3 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
          <Button type="submit" className="w-full" loading={loading}>{mode === "login" ? "Sign In" : "Create Account"}</Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
          <div className="relative text-center text-xs text-gray-400"><span className="bg-white px-2">or continue with</span></div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </Button>

        <p className="text-center text-sm text-gray-500">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError("") }} className="text-primary font-medium hover:underline">{mode === "login" ? "Sign Up" : "Sign In"}</button>
        </p>
      </Card>
    </div>
  )
}
