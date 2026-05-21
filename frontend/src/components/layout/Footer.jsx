import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-white mb-3">FormAssist</h4>
            <p className="text-sm">Complete complex forms with AI guidance. Free, fast, and private.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Forms</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/forms/visa" className="hover:text-white transition-colors">Visa Forms</Link></li>
              <li><Link to="/forms/tax" className="hover:text-white transition-colors">Tax Forms</Link></li>
              <li><Link to="/forms/education" className="hover:text-white transition-colors">Education Forms</Link></li>
              <li><Link to="/forms/government" className="hover:text-white transition-colors">Government Forms</Link></li>
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
          &copy; {new Date().getFullYear()} FormAssist. All rights reserved. This is an AI-assisted tool. Verify all information before submitting official forms.
        </div>
      </div>
    </footer>
  )
}
