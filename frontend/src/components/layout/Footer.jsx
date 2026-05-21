import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-white mb-3">DocAssist</h4>
            <p className="text-sm">Upload any document. AI extracts, explains, and helps you fill it correctly.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Features</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Upload Document</Link></li>
              <li><Link to="/chat" className="hover:text-white transition-colors">AI Chat</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Guides</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} DocAssist. All rights reserved. This is an AI-assisted tool. Verify all information before submitting official documents.
        </div>
      </div>
    </footer>
  )
}
