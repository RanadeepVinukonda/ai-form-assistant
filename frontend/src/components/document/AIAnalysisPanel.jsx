import { useState } from "react"
import { FileText, ChevronDown, ChevronUp, Copy, Check } from "lucide-react"

export default function AIAnalysisPanel({ fileName, extractedText, analysis }) {
  const [showRaw, setShowRaw] = useState(false)
  const [copied, setCopied] = useState(false)

  function copyText() {
    navigator.clipboard.writeText(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Document info card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-gray-700">{fileName}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-white px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 font-medium">
            {analysis?.documentType || "Document"}
          </span>
          {analysis?.title && (
            <span className="text-xs bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-600">
              {analysis.title}
            </span>
          )}
          {analysis?.fields && (
            <span className="text-xs bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-600">
              {analysis.fields.length} field{analysis.fields.length !== 1 ? "s" : ""} detected
            </span>
          )}
        </div>
      </div>

      {/* Extracted text accordion */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
        >
          <span>Raw extracted text</span>
          <div className="flex items-center gap-2">
            {showRaw && (
              <button
                onClick={(e) => { e.stopPropagation(); copyText() }}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Copy text"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            )}
            {showRaw ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>
        {showRaw && (
          <pre className="px-4 py-3 text-xs text-gray-600 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto bg-white">
            {extractedText}
          </pre>
        )}
      </div>
    </div>
  )
}
