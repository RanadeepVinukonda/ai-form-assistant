import { useState } from "react"
import { Sparkles, X } from "lucide-react"
import { useAI } from "../../hooks/useAI"
import { Card } from "../ui"

export default function FieldExplanation({ fieldId, slug, isOpen, onClose }) {
  const { getExplanation, explaining } = useAI()
  const [content, setContent] = useState(null)

  async function handleOpen() {
    const text = await getExplanation(slug, fieldId)
    setContent(text)
  }

  if (!isOpen) return null

  if (!content) handleOpen()

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30" onClick={onClose}>
      <Card className="max-w-md w-full p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="h-4 w-4" /> AI Explanation
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
        </div>
        {explaining ? (
          <div className="flex items-center gap-2 text-sm text-gray-500"><span className="loading loading-spinner loading-xs"></span> Loading...</div>
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
        )}
      </Card>
    </div>
  )
}

export function AISuggestButton({ fieldId, slug, formData, onFill, className = "" }) {
  const { getSuggestion, suggestions } = useAI()
  const [loading, setLoading] = useState(false)

  async function handleSuggest() {
    setLoading(true)
    const val = await getSuggestion(slug, fieldId, formData)
    setLoading(false)
    if (val && onFill) onFill(fieldId, val)
  }

  const suggestion = suggestions[fieldId]

  return (
    <div>
      <button onClick={handleSuggest} disabled={loading} className={`text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1 ${className}`}>
        {loading ? <span className="loading loading-spinner loading-xs"></span> : <Sparkles className="h-3 w-3" />}
        {loading ? "AI thinking..." : suggestion ? "Suggest again" : "AI Suggest"}
      </button>
      {suggestion && !loading && (
        <p className="text-xs text-green-700 mt-1 bg-green-50 px-2 py-1 rounded">Suggestion: {suggestion}</p>
      )}
    </div>
  )
}
