import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Search, ArrowRight, FileText } from "lucide-react"
import { Card } from "../components/ui"

const allForms = [
  { slug: "ds-160", title: "DS-160 (US Visa Application)", category: "visa", desc: "Online Nonimmigrant Visa Application for the United States", tags: ["usa", "visa", "b1", "f1"] },
  { slug: "itr-1", title: "ITR-1 (Income Tax Return - India)", category: "tax", desc: "Income Tax Return for resident individual salaried taxpayers", tags: ["india", "tax", "itr"] },
  { slug: "passport", title: "Passport Application (India)", category: "government", desc: "Apply for or renew an Indian passport online", tags: ["india", "passport"] },
  { slug: "income-certificate", title: "Income Certificate Application", category: "government", desc: "Apply for income certificate for education, schemes & benefits", tags: ["india", "income"] },
  { slug: "scholarship", title: "Scholarship Application (General)", category: "education", desc: "Merit, need-based, and international scholarship applications", tags: ["scholarship", "education"] },
]

const labels = { visa: "Visa Forms", tax: "Tax Forms", government: "Government Forms", education: "Education Forms" }

export default function FormCatalog() {
  const { category } = useParams()
  const [query, setQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const filtered = allForms.filter((f) => {
    if (category && f.category !== category) return false
    if (query && !f.title.toLowerCase().includes(query.toLowerCase()) && !f.desc.toLowerCase().includes(query.toLowerCase())) return false
    if (selectedTag && !f.tags.includes(selectedTag)) return false
    return true
  })

  const allTags = [...new Set(allForms.flatMap((f) => f.tags))]

  return (
    <div className="section-container py-8 space-y-6">
      <Helmet>
        <title>{category ? `${labels[category] || category} — AI Form Assistant` : "All Forms — AI Form Assistant"}</title>
        <meta name="description" content={`Browse ${category ? `${labels[category] || category}` : "all"} government forms with AI-powered filling assistance.`} />
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold">{category ? labels[category] || category : "All Forms"}</h1>
        <p className="text-sm text-gray-500 mt-1">{filtered.length} form{filtered.length !== 1 ? "s" : ""} available</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="search" placeholder="Search forms..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedTag("")} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${!selectedTag ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:border-primary"}`}>All</button>
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedTag === tag ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:border-primary"}`}>{tag}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((form) => (
          <Link key={form.slug} to={`/forms/${form.category}/${form.slug}`}>
            <Card className="p-5 h-full hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{labels[form.category] || form.category}</span>
              </div>
              <h3 className="font-medium text-sm mt-3 group-hover:text-primary transition-colors">{form.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{form.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {form.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">#{tag}</span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>No forms found. Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}
