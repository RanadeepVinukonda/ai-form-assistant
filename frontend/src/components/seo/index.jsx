import { Helmet } from "react-helmet-async"

export default function JSONLD({ schema }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function FAQSection({ faqs }) {
  if (!faqs || faqs.length === 0) return null
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <details key={i} className="bg-white border border-gray-200 rounded-lg group">
          <summary className="px-4 py-3 font-medium text-sm cursor-pointer hover:bg-gray-50 rounded-lg list-none flex items-center justify-between">
            {faq.question}
            <span className="text-gray-400 group-open:rotate-180 transition-transform">\u25BC</span>
          </summary>
          <p className="px-4 pb-3 text-sm text-gray-600">{faq.answer}</p>
        </details>
      ))}
    </section>
  )
}

export function RelatedForms({ currentSlug, category, forms }) {
  const related = forms
    .filter((f) => f.category === category && f.slug !== currentSlug)
    .slice(0, 3)
  if (related.length === 0) return null
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Related Forms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((f) => (
          <a key={f.slug} href={`/forms/${f.category}/${f.slug}`} className="block p-4 bg-white border border-gray-200 rounded-xl hover:border-primary transition-colors">
            <h3 className="font-medium text-sm">{f.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{f.shortDescription}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export function FormHowTo({ steps }) {
  const defaultSteps = ["Open the form and review all sections", "Fill in each section with your information", "Use AI explanations for any field you don't understand", "Review and validate all entries", "Download or print the completed form"]
  const items = steps || defaultSteps
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">How to Fill This Form</h2>
      <ol className="space-y-2">
        {items.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
            <span className="text-gray-700 pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
