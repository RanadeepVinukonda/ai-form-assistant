import { useState, useCallback } from "react"
import { Upload, Loader2, FileText, CheckCircle } from "lucide-react"

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
  pdfjs.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs"
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

function isPdf(file) {
  return file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf")
}

export default function UploadZone({ onComplete }) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState("")
  const [error, setError] = useState("")

  const handleFile = useCallback(async (file) => {
    if (!file) return
    setError("")
    setLoading(true)
    setProgress(0)

    try {
      setPhase("Reading document...")
      setProgress(10)

      let extractedText
      if (isPdf(file)) {
        setPhase("Converting PDF pages...")
        const dataUrls = await pdfPageToBase64(file)
        const pageTexts = []
        for (let i = 0; i < dataUrls.length; i++) {
          setPhase(`Extracting page ${i + 1} with AI vision...`)
          setProgress(20 + Math.round((i / dataUrls.length) * 40))
          const comma = dataUrls[i].indexOf(",")
          const base64 = dataUrls[i].slice(comma + 1)
          const mime = dataUrls[i].slice(5, comma)
          const res = await fetch("/api/vision/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64, mime }),
          })
          if (!res.ok) throw new Error((await res.json()).error || "Vision API failed")
          const { text } = await res.json()
          pageTexts.push(text)
        }
        extractedText = pageTexts.join("\n\n--- Page Break ---\n\n")
      } else {
        setPhase("Extracting text with AI vision...")
        setProgress(20)
        const { base64, mime } = await fileToBase64(file)
        const res = await fetch("/api/vision/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, mime }),
        })
        if (!res.ok) throw new Error((await res.json()).error || "Vision API failed")
        const { text } = await res.json()
        extractedText = text
      }

      setPhase("AI is analyzing document...")
      setProgress(70)
      const analysisRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      })
      if (!analysisRes.ok) throw new Error((await analysisRes.json()).error || "Analysis API failed")
      const analysis = await analysisRes.json()

      setProgress(95)
      setPhase("Done")

      const result = {
        id: Date.now().toString(36),
        fileName: file.name,
        extractedText,
        analysis,
        timestamp: Date.now(),
      }

      localStorage.setItem("doc_review", JSON.stringify(result))
      setProgress(100)
      if (onComplete) onComplete(result.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [onComplete])

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0]
    handleFile(file)
  }

  return (
    <div className="space-y-3">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative flex flex-col items-center justify-center h-52 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
          loading
            ? "border-blue-300 bg-blue-50"
            : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-primary hover:bg-gray-50 bg-white"
        }`}
      >
        {!loading && (
          <input
            type="file"
            accept="image/*,.pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleDrop}
          />
        )}
        {loading ? (
          <div className="text-center px-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700">{phase}</p>
            <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full mt-3 mx-auto overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{progress}%</p>
          </div>
        ) : (
          <div className="text-center px-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-base font-semibold text-gray-800">Upload a document</p>
            <p className="text-sm text-gray-500 mt-1">Drop an image or PDF here, or click to browse</p>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, PDF — AI extracts and analyzes all text</p>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-4 py-2.5 rounded-lg">
          <span>⚠</span> {error}
        </div>
      )}
    </div>
  )
}
