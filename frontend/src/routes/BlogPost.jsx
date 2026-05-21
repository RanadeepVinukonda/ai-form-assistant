import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Card } from "../components/ui"

export default function BlogPost() {
  const { slug } = useParams()
  return (
    <div className="section-container py-8 max-w-3xl mx-auto space-y-4">
      <Helmet><title>Blog Post — AI Form Assistant</title></Helmet>
      <Link to="/blog" className="text-sm text-primary hover:underline">&larr; Back to guides</Link>
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-2 capitalize">Guide: {slug?.replace(/-/g, " ")}</h1>
        <p className="text-gray-500">Full article coming soon. This guide is being written to help you navigate this form step by step.</p>
      </Card>
    </div>
  )
}
