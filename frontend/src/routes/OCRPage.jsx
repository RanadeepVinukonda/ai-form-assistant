import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button, Card } from "../components/ui"
import DocumentUploader, { OCRPreview } from "../components/ocr"
import { api } from "../lib/api"

export default function OCRPage() {
  const location = useLocation()
  const initialText = location.state?.extractedText || ""
  const [extractedText, setExtractedText] = useState(initialText)
  const [autoFilled, setAutoFilled] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleAutoFill() {
    if (!extractedText.trim()) return
    setLoading(true)
    try {
      const result = await api.ocr.autoFill("auto", extractedText, "en")
      setAutoFilled(result)
    } catch (err) {
      alert("Auto-fill failed: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-container py-8 space-y-6 max-w-3xl mx-auto">
      <Helmet>
        <title>Upload & OCR Auto-Fill — AI Form Assistant</title>
        <meta name="description" content="Upload scanned forms and documents, extract text with OCR, and auto-fill government forms." />
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold">Upload &amp; OCR Auto-Fill</h1>
        <p className="text-sm text-gray-500 mt-1">Upload a scanned form, extract the text, and auto-fill into any supported form.</p>
      </div>

      <DocumentUploader onTextExtracted={setExtractedText} />

      {extractedText && (
        <div className="space-y-4">
          <OCRPreview text={extractedText} />
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAutoFill} loading={loading}>
              <Sparkles className="h-4 w-4" /> Auto-Fill Using AI
            </Button>
          </div>
        </div>
      )}

      {autoFilled && (
        <Card className="p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">Auto-Fill Results</h3>
          <p className="text-sm text-gray-600">AI matched the following fields from your document:</p>
          <div className="space-y-2">
            {Object.entries(autoFilled).map(([field, value]) => (
              <div key={field} className="flex justify-between items-center py-1 border-b text-sm">
                <span className="text-gray-600 capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
          <Link to="/forms"><Button size="sm"><ArrowRight className="h-4 w-4" /> Pick a Form to Fill</Button></Link>
        </Card>
      )}
    </div>
  )
}
