import { useEffect, useState, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ChevronLeft, ChevronRight, Sparkles, Save, Eye, Download, Check } from "lucide-react"
import { Button, Card, ProgressBar } from "../components/ui"
import FieldRenderer from "../components/form/FieldRenderer"
import FormStepper from "../components/form/FormStepper"
import FieldExplanation from "../components/ai/FieldExplanation"
import { AISuggestButton } from "../components/ai/FieldExplanation"
import { useAutoSave, clearAutoSave } from "../hooks/useAutoSave"
import { validateSchema, calculateProgress } from "../lib/validation"
import metadata from "../../../shared/form-schemas/form-metadata.json"

const schemaMap = {
  "ds-160": () => import("../../../shared/form-schemas/visa/ds-160.json"),
  "itr-1": () => import("../../../shared/form-schemas/tax/itr-1.json"),
  "passport": () => import("../../../shared/form-schemas/government/passport.json"),
  "income-certificate": () => import("../../../shared/form-schemas/government/income-certificate.json"),
  "scholarship": () => import("../../../shared/form-schemas/education/scholarship.json"),
}

export default function FormFill() {
  const { category, slug } = useParams()
  const meta = metadata[slug]
  const [schema, setSchema] = useState(null)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [currentSection, setCurrentSection] = useState(0)
  const [status, setStatus] = useState("filling")
  const [explainField, setExplainField] = useState(null)
  const [saved, setSaved] = useState(false)

  useAutoSave(slug, data, 30000)

  useEffect(() => {
    const load = schemaMap[slug]
    if (load) load().then((mod) => setSchema(mod.default || mod))
  }, [slug])

  const sections = meta?.sections || []
  const sectionFields = schema?.filter((f) => f.section === sections[currentSection]) || []

  const progress = calculateProgress(schema, data)

  const handleFieldChange = useCallback((fieldId, value) => {
    setData((d) => ({ ...d, [fieldId]: value }))
    setErrors((e) => ({ ...e, [fieldId]: null }))
    setSaved(false)
  }, [])

  const handleNextSection = useCallback(() => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentSection, sections.length])

  const handlePrevSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection((s) => s - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentSection])

  function handleValidate() {
    const errs = validateSchema(sectionFields, data)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      if (currentSection < sections.length - 1) handleNextSection()
      else setStatus("review")
    }
  }

  function handleSaveProgress() {
    localStorage.setItem(`saved_${slug}`, JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleFillManual(fieldId, value) {
    handleFieldChange(fieldId, value)
  }

  if (!schema || !meta) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="loading loading-spinner loading-lg text-primary"></div>
    </div>
  )

  return (
    <div className="section-container py-6 space-y-6 max-w-4xl mx-auto">
      <Helmet>
        <title>Fill: {meta.title} — AI Form Assistant</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to={`/forms/${category}/${slug}`} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-1">
            <ChevronLeft className="h-3 w-3" /> Back to form info
          </Link>
          <h1 className="text-xl font-bold">{meta.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleSaveProgress}>
            {saved ? <><Check className="h-3.5 w-3.5" /> Saved</> : <><Save className="h-3.5 w-3.5" /> Save</>}
          </Button>
        </div>
      </div>

      <ProgressBar value={progress} label="Form Progress" />

      {/* Stepper */}
      {sections.length > 0 && (
        <FormStepper sections={sections} sectionLabels={meta.sectionLabels} currentSection={currentSection} onNavigate={setCurrentSection} />
      )}

      {/* Review Mode */}
      {status === "review" ? (
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 text-green-700">
            <Check className="h-5 w-5" /> <h2 className="font-semibold">Review Your Form</h2>
          </div>
          <p className="text-sm text-gray-500">Please review all answers before generating your output. Tap any field to edit.</p>
          {sections.map((secKey) => {
            const secFields = schema.filter((f) => f.section === secKey)
            return (
              <div key={secKey} className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">{meta.sectionLabels?.[secKey] || secKey}</h3>
                {secFields.map((field) => {
                  if (field.dependsOn && data[field.dependsOn.field] !== field.dependsOn.value) return null
                  return (
                    <div key={field.id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{field.label}</span>
                      <span className="text-sm font-medium">{data[field.id] || <span className="text-gray-300 italic">Empty</span>}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="outline" onClick={() => setStatus("filling")}><ChevronLeft className="h-4 w-4" /> Continue Editing</Button>
            <Button onClick={() => { clearAutoSave(slug); alert("Form completed! Download functionality coming soon.") }}><Download className="h-4 w-4" /> Generate Output</Button>
          </div>
        </Card>
      ) : (
        /* Fill Mode */
        <Card className="p-4 sm:p-6 space-y-5">
          <h2 className="font-semibold text-lg">{meta.sectionLabels?.[sections[currentSection]] || "Form Fields"}</h2>
          <p className="text-xs text-gray-500">Fill in the fields below. Use the AI buttons for help.</p>

          {sectionFields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <FieldRenderer field={field} value={data[field.id]} error={errors[field.id]} onChange={handleFieldChange} />
                </div>
                <div className="flex items-center gap-1 shrink-0 mt-1">
                  <button onClick={() => setExplainField(field.id)} className="p-1.5 rounded-lg hover:bg-blue-50 text-primary transition-colors" title="Explain this field">
                    <Sparkles className="h-3.5 w-3.5" />
                  </button>
                  <AISuggestButton fieldId={field.id} slug={slug} formData={data} onFill={handleFillManual} />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handlePrevSection} disabled={currentSection === 0}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleValidate}>
              {currentSection < sections.length - 1 ? <>Next <ChevronRight className="h-4 w-4" /></> : <><Eye className="h-4 w-4" /> Review</>}
            </Button>
          </div>
        </Card>
      )}

      <FieldExplanation fieldId={explainField} slug={slug} isOpen={!!explainField} onClose={() => setExplainField(null)} />
    </div>
  )
}
