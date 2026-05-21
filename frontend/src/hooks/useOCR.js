import { useState, useCallback } from "react"
import { createWorker } from "tesseract.js"

async function pdfToImage(file, setProgress) {
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist")
  GlobalWorkerOptions.workerSrc = undefined
  const pdf = await getDocument({ data: await file.arrayBuffer() }).promise
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  let fullText = ""
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const vp = page.getViewport({ scale: 2 })
    canvas.width = vp.width
    canvas.height = vp.height
    await page.render({ canvasContext: ctx, viewport: vp }).promise
    const worker = await createWorker("eng", 1, {
      logger: (m) => { if (m.status === "recognizing text") setProgress(Math.round((i - 1 + m.progress) / pdf.numPages * 100)) },
    })
    const { data } = await worker.recognize(canvas)
    await worker.terminate()
    fullText += (fullText ? "\n" : "") + data.text
  }
  return fullText
}

export function useOCR() {
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [worker, setWorker] = useState(null)

  const initWorker = useCallback(async () => {
    const w = await createWorker("eng", 1, {
      logger: (m) => { if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100)) },
    })
    setWorker(w)
    return w
  }, [])

  function isPdf(file) {
    return file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf")
  }

  const extractText = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setProgress(0)
    try {
      let text
      if (isPdf(file)) {
        text = await pdfToImage(file, setProgress)
      } else {
        const w = worker || (await initWorker())
        const { data } = await w.recognize(file)
        text = data.text
      }
      setResult({ text, blocks: null, confidence: null })
      return text
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
