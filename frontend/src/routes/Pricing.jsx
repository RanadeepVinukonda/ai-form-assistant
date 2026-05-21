import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Check, Sparkles, FileText, MessageSquare, Download } from "lucide-react"
import { Button, Card } from "../components/ui"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For individuals getting started with forms.",
    features: ["5 AI explanations per day", "Basic OCR (image only)", "Auto-save progress", "All standard forms", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "For frequent filers who want the best experience.",
    features: ["Unlimited AI explanations", "Unlimited AI suggestions", "OCR + PDF support", "PDF export & download", "Priority AI chat", "Email support", "Ad-free experience"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations and high-volume filing needs.",
    features: ["All Pro features", "API access", "Custom form templates", "Bulk processing", "Dedicated support", "SLA guarantee", "Custom integrations"],
    cta: "Contact Us",
    popular: false,
  },
]

const freeVsPro = [
  { feature: "AI Field Explanations", free: "5/day", pro: "Unlimited" },
  { feature: "AI Auto-Suggest", free: "—", pro: "Unlimited" },
  { feature: "OCR (Image)", free: "✓", pro: "✓" },
  { feature: "OCR (PDF)", free: "—", pro: "✓" },
  { feature: "PDF Export", free: "—", pro: "✓" },
  { feature: "Priority Chat", free: "—", pro: "✓" },
  { feature: "Ads", free: "Shown", pro: "None" },
]

export default function Pricing() {
  return (
    <div className="section-container py-16 space-y-12">
      <Helmet>
        <title>Pricing — AI Form Assistant</title>
        <meta name="description" content="Free and Pro plans for AI-powered form filling assistance. Start free, upgrade for unlimited features." />
      </Helmet>

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-gray-500">Start free. Upgrade when you need more. No hidden fees.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`p-6 flex flex-col ${plan.popular ? "ring-2 ring-primary shadow-lg relative" : ""}`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</div>}
            <div className="mb-4">
              <h3 className="font-semibold">{plan.name}</h3>
              <div className="mt-2"><span className="text-3xl font-bold">{plan.price}</span><span className="text-gray-500 text-sm">{plan.period}</span></div>
              <p className="text-sm text-gray-500 mt-2">{plan.desc}</p>
            </div>
            <ul className="space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> {f}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Button variant={plan.popular ? "primary" : "outline"} className="w-full">{plan.cta}</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison table */}
      <Card className="max-w-3xl mx-auto p-6">
        <h2 className="font-semibold text-lg mb-4">Free vs Pro</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="pb-2 font-medium">Feature</th><th className="pb-2 font-medium">Free</th><th className="pb-2 font-medium">Pro</th></tr></thead>
            <tbody>
              {freeVsPro.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="py-2.5 text-gray-700">{row.feature}</td>
                  <td className="py-2.5">{row.free}</td>
                  <td className="py-2.5 font-medium text-green-700">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
