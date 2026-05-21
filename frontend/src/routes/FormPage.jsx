import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Clock, DollarSign, ArrowRight, Building2, Sparkles } from "lucide-react"
import { Button } from "../components/ui"
import JSONLD, { FAQSection, RelatedForms, FormHowTo } from "../components/seo"
import DocumentUploader from "../components/ocr"
import metadata from "../../../shared/form-schemas/form-metadata.json"

const formList = [
  { slug: "ds-160", title: "DS-160 (US Visa Application)", category: "visa", desc: "Online Nonimmigrant Visa Application for the United States" },
  { slug: "itr-1", title: "ITR-1 (Income Tax Return - India)", category: "tax", desc: "Income Tax Return for resident individual salaried taxpayers" },
  { slug: "passport", title: "Passport Application (India)", category: "government", desc: "Apply for or renew an Indian passport online" },
  { slug: "income-certificate", title: "Income Certificate Application", category: "government", desc: "Apply for income certificate for education, schemes & benefits" },
  { slug: "scholarship", title: "Scholarship Application (General)", category: "education", desc: "Merit, need-based, and international scholarship applications" },
]

export default function FormPage() {
  const { category, slug } = useParams()
  const meta = metadata[slug]
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: meta?.category ? `${meta.category.charAt(0).toUpperCase() + meta.category.slice(1)} Forms` : "Forms", to: `/forms/${meta?.category || ""}` },
    { label: meta?.title || slug, to: `#` },
  ]

  const jsonld = useMemo(() => meta ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs?.map((f) => ({
      "@type": "Question", "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })) || [],
  } : null, [meta])

  if (!meta) return (
    <div className="section-container py-16 text-center">
      <h1 className="text-2xl font-bold mb-2">Form Not Found</h1>
      <p className="text-gray-500 mb-4">The form "{slug}" is not available yet.</p>
      <Link to="/forms"><Button>Browse All Forms</Button></Link>
    </div>
  )

  return (
    <div className="section-container py-8 space-y-8">
      <Helmet>
        <title>{meta.seo?.metaTitle || `${meta.title} — AI Form Assistant`}</title>
        <meta name="description" content={meta.seo?.metaDescription || meta.shortDescription} />
      </Helmet>
      {jsonld && <JSONLD schema={jsonld} />}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        {breadcrumbs.map((b, i) => (
          <span key={b.to}>
            {i > 0 && <span className="mx-1">/</span>}
            {i === breadcrumbs.length - 1 ? <span className="text-gray-900 font-medium">{b.label}</span> : <Link to={b.to} className="hover:text-primary">{b.label}</Link>}
          </span>
        ))}
      </nav>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="trust-badge">
            <Building2 className="h-3.5 w-3.5" /> {meta.authority}
          </div>
          <h1 className="text-3xl font-bold">{meta.title}</h1>
          <p className="text-gray-600">{meta.longDescription}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {meta.processingTime && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {meta.processingTime}</span>}
            {meta.fees && <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {meta.fees}</span>}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to={`/fill/${category}/${slug}`}><Button size="lg"><Sparkles className="h-4 w-4" /> Fill with AI Guidance <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
          {meta.tags && (
            <div className="flex flex-wrap gap-1.5">
              {meta.tags.map((tag) => <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">#{tag}</span>)}
            </div>
          )}
        </div>

        {/* Quick OCR */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
          <h3 className="font-medium text-sm flex items-center gap-2"><DocumentUploader /> Quick Auto-Fill</h3>
          <p className="text-xs text-gray-500">Upload a scanned version of this form and we&apos;ll extract the data for you.</p>
          <DocumentUploader onTextExtracted={(text) => console.log("extracted", text)} />
        </div>
      </div>

      {/* Sections overview */}
      {meta.sections && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Form Sections</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {meta.sections.map((key) => (
              <div key={key} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{meta.sections.indexOf(key) + 1}</span>
                {meta.sectionLabels?.[key] || key}
              </div>
            ))}
          </div>
        </section>
      )}

      <FormHowTo />
      <FAQSection faqs={meta.faqs} />
      <RelatedForms currentSlug={slug} category={meta.category || category} forms={formList} />
    </div>
  )
}
