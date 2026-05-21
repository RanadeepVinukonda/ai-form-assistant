import { useState } from "react"
import { Sparkles, Info, Plus, Trash2, Check } from "lucide-react"
import { Button, Input, Textarea, Select } from "../ui"

function FieldRow({ field, value, onChange, onExplain, onSuggest, onRemove, explaining, suggesting, explanation, suggestion }) {
  const inputType = field.type === "textarea" ? "textarea" : field.type === "select" ? "select" : field.type === "number" ? "number" : field.type === "tel" ? "tel" : field.type === "email" ? "email" : field.type === "date" ? "date" : "text"

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          {field.label || field.id}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onExplain(field)}
            disabled={explaining}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
            title="Explain this field"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onSuggest(field)}
            disabled={suggesting}
            className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
            title="AI suggest value"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onRemove(field.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
            title="Remove this field"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {inputType === "textarea" ? (
        <Textarea value={value || ""} onChange={(e) => onChange(field.id, e.target.value)} placeholder={`Enter ${field.label || field.id}...`} />
      ) : inputType === "select" ? (
        <Select
          value={value || ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          options={[{ value: "", label: `Select ${field.label || field.id}...` }, ...(field.options || [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }])]}
        />
      ) : (
        <Input type={inputType} value={value || ""} onChange={(e) => onChange(field.id, e.target.value)} placeholder={`Enter ${field.label || field.id}...`} />
      )}

      {explanation && (
        <p className="text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-start gap-1.5">
          <Info className="h-3 w-3 mt-0.5 shrink-0" /> {explanation}
        </p>
      )}
      {suggestion && (
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
          <Sparkles className="h-3 w-3 shrink-0" /> Suggestion: {suggestion}
          <button
            onClick={() => onChange(field.id, suggestion)}
            className="ml-auto flex items-center gap-1 font-medium text-green-700 hover:text-green-800"
          >
            <Check className="h-3 w-3" /> Apply
          </button>
        </div>
      )}

      {field.description && !explanation && (
        <p className="text-xs text-gray-500">{field.description}</p>
      )}
    </div>
  )
}

export default function DynamicForm({ fields: initialFields, documentTitle, onFieldsChange }) {
  const [fields, setFields] = useState(initialFields || [])
  const [explainField, setExplainField] = useState(null)
  const [explaining, setExplaining] = useState(false)
  const [suggestField, setSuggestField] = useState(null)
  const [suggesting, setSuggesting] = useState(false)
  const [explanations, setExplanations] = useState({})
  const [suggestions, setSuggestions] = useState({})

  function handleChange(fieldId, value) {
    const next = fields.map((f) => (f.id === fieldId ? { ...f, value } : f))
    setFields(next)
    onFieldsChange?.(next)
  }

  function handleRemove(fieldId) {
    const next = fields.filter((f) => f.id !== fieldId)
    setFields(next)
    onFieldsChange?.(next)
  }

  async function handleExplain(field) {
    setExplaining(true)
    setExplainField(field.id)
    try {
      const res = await fetch("/api/analyze/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fieldLabel: field.label || field.id, documentTitle: documentTitle || "" }),
      })
      if (res.ok) {
        const { explanation } = await res.json()
        setExplanations((e) => ({ ...e, [field.id]: explanation }))
      }
    } catch {
      setExplanations((e) => ({ ...e, [field.id]: "Unable to load explanation." }))
    } finally {
      setExplaining(false)
    }
  }

  async function handleSuggest(field) {
    setSuggesting(true)
    setSuggestField(field.id)
    try {
      const otherFields = {}
      fields.forEach((f) => { if (f.id !== field.id && f.value) otherFields[f.label || f.id] = f.value })
      const res = await fetch("/api/analyze/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fieldLabel: field.label || field.id, documentTitle: documentTitle || "", otherFields }),
      })
      if (res.ok) {
        const { suggestion } = await res.json()
        setSuggestions((s) => ({ ...s, [field.id]: suggestion }))
      }
    } catch {
      // silent
    } finally {
      setSuggesting(false)
    }
  }

  function addCustomField() {
    const id = `custom_${Date.now()}`
    const newField = { id, label: "New Field", value: "", description: "Custom field you added", type: "text", required: false }
    setFields((prev) => [...prev, newField])
    onFieldsChange?.([...fields, newField])
  }

  if (!fields || fields.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-sm">No fields detected. Try uploading a clearer document.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{fields.length} field{fields.length !== 1 ? "s" : ""} detected</p>
        <Button variant="ghost" size="sm" onClick={addCustomField}>
          <Plus className="h-3.5 w-3.5" /> Add Field
        </Button>
      </div>
      {fields.map((field) => (
        <FieldRow
          key={field.id}
          field={field}
          value={field.value}
          onChange={handleChange}
          onExplain={handleExplain}
          onSuggest={handleSuggest}
          onRemove={handleRemove}
          explaining={explaining && explainField === field.id}
          suggesting={suggesting && suggestField === field.id}
          explanation={explanations[field.id]}
          suggestion={suggestions[field.id]}
        />
      ))}
    </div>
  )
}
