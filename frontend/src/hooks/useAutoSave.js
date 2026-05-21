import { useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"

export function useAutoSave(formSlug, formData, interval = 30000) {
  const { user } = useAuth()
  const dataRef = useRef(formData)
  dataRef.current = formData

  useEffect(() => {
    if (!user || !formSlug) return
    const id = setInterval(() => {
      try {
        const key = `autosave_${formSlug}`
        localStorage.setItem(key, JSON.stringify({ data: dataRef.current, savedAt: new Date().toISOString() }))
      } catch { /* storage full */ }
    }, interval)
    return () => clearInterval(id)
  }, [user, formSlug, interval])
}

export function getAutoSavedData(formSlug) {
  try {
    const raw = localStorage.getItem(`autosave_${formSlug}`)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearAutoSave(formSlug) {
  localStorage.removeItem(`autosave_${formSlug}`)
}
