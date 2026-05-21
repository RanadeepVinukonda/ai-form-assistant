import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, Download, Save, Check, RefreshCw } from "lucide-react"
import { Button, Card } from "../components/ui"
import AIAnalysisPanel from "../components/document/AIAnalysisPanel"
import DynamicForm from "../components/document/DynamicForm"

export default function DocumentReview() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [fields, setFields] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("doc_review")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.id === id) {
        setData(parsed)
        setFields(parsed.analysis?.fields || [])
        return
      }
    }
    setData(null)
  }, [id])

  function handleFieldsChange(updatedFields) {
    setFields(updatedFields)
    const stored = JSON.parse(localStorage.getItem("doc_review") || "{}")
    stored.analysis.fields = updatedFields
    localStorage.setItem("doc_review", JSON.stringify(stored))
  }

  function handleSave() {
    const stored = JSON.parse(localStorage.getItem("doc_review") || "{}")
    stored.analysis.fields = fields
    localStorage.setItem("doc_review", JSON.stringify(stored))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleExport() {
    const lines = fields.map((f) => `${f.label || f.id}: ${f.value || ""}`)
    const content = `=== ${data?.analysis?.title || "Document"} ===\n${lines.join("\n")}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data?.fileName?.replace(/\.[^/.]+$/, "") || "document"}_filled.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!data) {
    return (
      <div className="section-container py-16 text-center space-y-4">
        <p className="text-gray-500">Document not found. It may have expired or was never uploaded.</p>
        <Link to="/"><Button>Upload a new document</Button></Link>
      </div>
    )
  }

  return (
    <div className="section-container py-6 space-y-6 max-w-4xl mx-auto">
      <Helmet>
        <title>{data.analysis?.title || "Document Review"} — DocAssist</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-1">
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>
          <h1 className="text-xl font-bold">{data.analysis?.title || "Document Review"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            {saved ? <><Check className="h-3.5 w-3.5" /> Saved</> : <><Save className="h-3.5 w-3.5" /> Save</>}
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* AI Analysis Panel */}
      <AIAnalysisPanel
        fileName={data.fileName}
        extractedText={data.extractedText}
        analysis={data.analysis}
      />

      {/* Dynamic Form */}
      <Card className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Detected Fields</h2>
          <span className="text-xs text-gray-400">Edit fields below. AI explains each one.</span>
        </div>
        <DynamicForm
          fields={fields}
          documentTitle={data.analysis?.title}
          onFieldsChange={handleFieldsChange}
        />
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center pb-8">
        <Link to="/">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4" /> Upload another document
          </Button>
        </Link>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4" /> Download as text
        </Button>
      </div>
    </div>
  )
}
