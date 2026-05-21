import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, FileText, Scan, CheckCircle, Loader2 } from "lucide-react"
import { Button, Card } from "../ui"

export default function DocumentUploader({ onTextExtracted }) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState("")
  const navigate = useNavigate()

  async function handleFile(file) {
    if (!file) return
    setFileName(file.name)
    setLoading(true)
    setProgress(0)

    // Simulate progress — Tesseract runs in worker
    const progInterval = setInterval(() => setProgress((p) => Math.min(p + 10, 90)), 500)

    const { createWorker } = await import("tesseract.js")
    const worker = await createWorker("eng")
    worker.setProgressHandler((p) => setProgress(Math.round(p.progress * 100)))
    const { data } = await worker.recognize(file)
    await worker.terminate()

    clearInterval(progInterval)
    setProgress(100)

    const extracted = data.text.trim()
    setLoading(false)

    if (onTextExtracted) {
      onTextExtracted(extracted)
    } else {
      navigate("/ocr", { state: { extractedText: extracted, fileName: file.name } })
    }
  }

  return (
    <div className="space-y-4">
      <label className={`relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${loading ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-primary bg-gray-50"}`}>
        <input
          type="file"
          accept="image/*,.pdf"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files[0])}
          disabled={loading}
        />
        {loading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600">Processing... {progress}%</p>
            <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-2 mx-auto overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600">Upload a scanned form or document</p>
            <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, PDF</p>
          </div>
        )}
      </label>
      {fileName && !loading && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
          <CheckCircle className="h-4 w-4" /> {fileName} &mdash; processed
        </div>
      )}
    </div>
  )
}

export function OCRPreview({ text, confidence }) {
  if (!text) return null
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm flex items-center gap-2"><Scan className="h-4 w-4 text-primary" /> Extracted Text</h4>
        {confidence && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${confidence > 80 ? "bg-green-100 text-green-700" : confidence > 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
            {Math.round(confidence)}% confidence
          </span>
        )}
      </div>
      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 p-3 rounded-lg max-h-60 overflow-y-auto">{text}</pre>
    </Card>
  )
}
