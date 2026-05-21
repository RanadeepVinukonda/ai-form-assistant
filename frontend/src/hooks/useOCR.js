import { useState, useCallback } from "react"
import { createWorker } from "tesseract.js"

export function useOCR() {
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [worker, setWorker] = useState(null)

  const initWorker = useCallback(async () => {
    const w = await createWorker("eng")
    w.setProgressHandler((p) => setProgress(Math.round(p.progress * 100)))
    setWorker(w)
    return w
  }, [])

  const extractText = useCallback(async (imageFile) => {
    setLoading(true)
    setError(null)
    setProgress(0)
    try {
      const w = worker || (await initWorker())
      const { data } = await w.recognize(imageFile)
      setResult({ text: data.text, blocks: data.blocks, confidence: data.confidence })
      return data.text
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [worker, initWorker])

  const terminate = useCallback(async () => {
    if (worker) { await worker.terminate(); setWorker(null) }
  }, [worker])

  return { extractText, progress, result, loading, error, terminate }
}
