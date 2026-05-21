import { useState, useCallback } from "react"
import { api } from "../lib/api"

export function useAI() {
  const [explaining, setExplaining] = useState(null)
  const [suggestions, setSuggestions] = useState({})

  const getExplanation = useCallback(async (slug, fieldId) => {
    setExplaining(fieldId)
    try {
      const res = await api.forms.explain(slug, fieldId)
      return res.explanation
    } finally {
      setExplaining(null)
    }
  }, [])

  const getSuggestion = useCallback(async (slug, fieldId, formData) => {
    try {
      const res = await api.forms.suggest(slug, fieldId, formData)
      setSuggestions((s) => ({ ...s, [fieldId]: res.suggestion }))
      return res.suggestion
    } catch { return null }
  }, [])

  return { getExplanation, getSuggestion, suggestions, setSuggestions, explaining }
}
