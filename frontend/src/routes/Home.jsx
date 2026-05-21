import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Shield, Zap, Scan, MessageSquare, Globe, ArrowRight, FileText } from "lucide-react"
import { Button } from "../components/ui"
import UploadZone from "../components/document/UploadZone"

const features = [
  { icon: Scan, title: "AI Vision Understanding", desc: "Upload any document — AI extracts every word using vision models." },
  { icon: Zap, title: "Smart Field Detection", desc: "AI identifies and organizes fillable fields from your document." },
  { icon: FileText, title: "Dynamic Form Generation", desc: "Every detected field becomes an editable, explainable form input." },
  { icon: MessageSquare, title: "AI Explanations & Suggestions", desc: "Get plain-language explanations and smart fill suggestions for each field." },
  { icon: Shield, title: "Private by Design", desc: "Your documents stay yours. Encryption in transit and at rest." },
  { icon: Globe, title: "Any Document, Any Format", desc: "Works with images, PDFs, scanned docs — even handwriting (best effort)." },
]

export default function Home() {
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState(false)

  function handleComplete(docId) {
    setUploaded(true)
    setTimeout(() => navigate(`/review/${docId}`), 600)
  }

  return (
    <>
      <Helmet>
        <title>DocAssist — Upload Any Document, AI Helps You Fill It</title>
        <meta name="description" content="Upload any document, form, or application. AI extracts text, detects fields, explains each one, and suggests how to fill it correctly." />
      </Helmet>

      {/* Hero + Upload */}
      <section className="section-container py-12 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 trust-badge mb-2">
            <Shield className="h-3.5 w-3.5" /> Private &middot; Secure &middot; AI-Powered
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Upload Any Document.
            <br />
            <span className="text-primary">AI Helps You Fill It.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Drop a form, application, or document. Our AI extracts the text, detects every field, explains what each one means, and suggests how to fill it correctly.
          </p>
          <div className="max-w-xl mx-auto pt-4">
            <UploadZone onComplete={handleComplete} />
          </div>
          {uploaded && (
            <div className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg inline-flex items-center gap-2">
              <Scan className="h-4 w-4" /> Document analyzed! Opening review...
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-t border-b py-16">
        <div className="section-container space-y-8">
          <h2 className="text-2xl font-semibold text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Upload a Document", desc: "Drop any image or PDF. The AI reads it using computer vision — no manual typing needed." },
              { step: "2", title: "AI Analyzes & Extracts", desc: "Our AI identifies every fillable field, reads existing values, and describes what each field means." },
              { step: "3", title: "Edit & Export", desc: "Review the auto-detected fields, edit values, get AI suggestions, and export your completed document." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">{item.step}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-container py-16 space-y-8">
        <h2 className="text-2xl font-semibold text-center">Why DocAssist?</h2>
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
      </section>
    </>
  )
}
