import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react"
import { useOCR } from "../../hooks/useOCR"

export default function DocumentUploader({ onTextExtracted }) {
  const [fileName, setFileName] = useState("")
  const { extractText, progress, loading } = useOCR()
  const navigate = useNavigate()

  async function handleFile(file) {
    if (!file) return
    setFileName(file.name)
    const text = await extractText(file)
    if (text) {
      if (onTextExtracted) {
        onTextExtracted(text)
      } else {
        navigate("/ocr", { state: { extractedText: text, fileName: file.name } })
      }
    }
  }

  return (
    <div className="space-y-4">
      <label
        className={`relative flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${loading ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-primary bg-gray-50"}`}
      >
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
            <p className="text-sm text-gray-600">Processing via AI vision... {progress}%</p>
            <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-2 mx-auto overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600">Upload a document or form image</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF — AI extracts all text automatically</p>
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
    <div className="p-4 rounded-xl bg-white border space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" /> Extracted Text
        </h4>
        {confidence && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            confidence > 80 ? "bg-green-100 text-green-700" :
            confidence > 50 ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {Math.round(confidence)}% confidence
          </span>
        )}
      </div>
      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 p-3 rounded-lg max-h-60 overflow-y-auto">{text}</pre>
    </div>
  )
}
