import { useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Search, ArrowRight, Shield, Zap, Globe, FileText, Scan, MessageSquare } from "lucide-react"
import { Button } from "../components/ui"
import DocumentUploader from "../components/ocr"

const features = [
  { icon: FileText, title: "100+ Government Forms", desc: "From visa applications to tax returns — all in one place." },
  { icon: Zap, title: "AI-Powered Guidance", desc: "Field-by-field explanations and smart suggestions as you fill." },
  { icon: Scan, title: "OCR Auto-Fill", desc: "Upload a filled form, extract text, and auto-populate your answers." },
  { icon: MessageSquare, title: "24/7 AI Chat Support", desc: "Ask questions in plain language while filling any form." },
  { icon: Shield, title: "Private by Design", desc: "All OCR and data processing happens in your browser." },
  { icon: Globe, title: "Multi-Language Support", desc: "Fill forms in English, Hindi, Spanish, and more." },
]

const categories = [
  { name: "visa", label: "Visa Forms", count: 1, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "tax", label: "Tax Forms", count: 1, color: "bg-green-50 text-green-700 border-green-200" },
  { name: "government", label: "Government Forms", count: 2, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "education", label: "Education Forms", count: 1, color: "bg-purple-50 text-purple-700 border-purple-200" },
]

export default function Home() {
  const [showOcr, setShowOcr] = useState(false)

  return (
    <>
      <Helmet>
        <title>AI Form Assistant — Complete Government Forms with AI Guidance</title>
        <meta name="description" content="Fill visa applications, tax returns, passports, and government forms faster with AI-powered guidance, OCR auto-fill, and multi-language support." />
      </Helmet>

      {/* Hero */}
      <section className="section-container py-16 sm:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 trust-badge mb-4">
            <Shield className="h-3.5 w-3.5" /> Private &middot; Secure &middot; Free
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Complete Forms with <span className="text-primary">AI Guidance</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From visa applications to tax returns &mdash; fill any government form faster with field-by-field AI explanations, OCR auto-fill, and real-time validation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/forms"><Button size="lg">Browse Forms <ArrowRight className="h-4 w-4" /></Button></Link>
            <Button variant="outline" size="lg" onClick={() => setShowOcr(!showOcr)}>
              <Scan className="h-4 w-4" /> Upload &amp; Auto-Fill
            </Button>
          </div>
          {showOcr && <div className="max-w-md mx-auto"><DocumentUploader /></div>}
        </div>
      </section>

      {/* Quick Upload CTA */}
      <section className="section-container pb-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-blue-100">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold mb-1">Already have a filled form?</h2>
            <p className="text-sm text-gray-600">Upload a scanned copy and let our OCR extract the data automatically.</p>
          </div>
          <Link to="/ocr"><Button><Scan className="h-4 w-4" /> Upload Document</Button></Link>
        </div>
      </section>

      {/* Categories */}
      <section className="section-container pb-16">
        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/forms/${cat.name}`} className={`p-4 rounded-xl border-2 ${cat.color} hover:shadow-sm transition-shadow`}>
              <div className="text-sm font-medium">{cat.label}</div>
              <div className="text-xs mt-1 opacity-75">{cat.count} form{cat.count !== 1 ? "s" : ""}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-b py-16">
        <div className="section-container space-y-8">
          <h2 className="text-2xl font-semibold text-center">Why FormAssist?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-container py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "1", title: "Choose a Form", desc: "Select from our library of government and legal forms." },
            { step: "2", title: "Fill with AI Help", desc: "Get field-by-field guidance, AI suggestions, and instant validation." },
            { step: "3", title: "Download & Submit", desc: "Review your completed form, download it, and submit to the authority." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">{item.step}</div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
