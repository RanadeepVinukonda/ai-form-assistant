import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Menu, X, FileText, User, LogIn } from "lucide-react"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/forms", label: "Forms" },
  { to: "/ocr", label: "Upload & OCR" },
  { to: "/blog", label: "Guides" },
  { to: "/pricing", label: "Pricing" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <FileText className="h-5 w-5" />
            <span>FormAssist</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors ${location.pathname === link.to ? "text-primary" : "text-gray-600 hover:text-gray-900"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            ) : (
              <Link to="/auth" className="btn btn-primary btn-sm gap-1.5">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`block px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === link.to ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
