import { useState, useCallback } from "react"

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      const comma = result.indexOf(",")
      resolve({ base64: result.slice(comma + 1), mime: result.slice(5, comma) })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function pdfPageToBase64(file) {
  const pdfjs = await import("pdfjs-dist")
  pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs"
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const results = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const vp = page.getViewport({ scale: 2 })
    canvas.width = vp.width
    canvas.height = vp.height
    await page.render({ canvasContext: ctx, viewport: vp }).promise
    results.push(canvas.toDataURL("image/jpeg", 0.9))
  }
  return results
}

async function visionOCR(file, onProgress) {
  onProgress?.(10)
  const { base64, mime } = await fileToBase64(file)
  onProgress?.(30)
  const res = await fetch("/api/ocr/vision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64, mime }),
  })
  onProgress?.(80)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Vision API failed")
  }
  const { text } = await res.json()
  onProgress?.(100)
  return text
}

async function visionOCRFromCanvas(dataUrl, onProgress) {
  onProgress?.(10)
  const comma = dataUrl.indexOf(",")
  const base64 = dataUrl.slice(comma + 1)
  const mime = dataUrl.slice(5, comma)
  onProgress?.(20)
  const res = await fetch("/api/ocr/vision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64, mime }),
  })
  onProgress?.(80)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Vision API failed")
  }
  const { text } = await res.json()
  onProgress?.(100)
  return text
}

function isPdf(file) {
  return file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf")
}

export function useOCR() {
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const extractText = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setProgress(0)
    try {
      let text
      if (isPdf(file)) {
        const dataUrls = await pdfPageToBase64(file)
        const pageResults = []
        for (let i = 0; i < dataUrls.length; i++) {
          const t = await visionOCRFromCanvas(dataUrls[i], (p) => {
            setProgress(Math.round((i + p / 100) / dataUrls.length * 100))
          })
          pageResults.push(t)
        }
        text = pageResults.join("\n\n--- Page " + (pageResults.length > 1 ? "break ---\n\n" : ""))
      } else {
        text = await visionOCR(file, setProgress)
      }
      setResult({ text, blocks: null, confidence: null })
      return text
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { extractText, progress, result, loading, error }
}
