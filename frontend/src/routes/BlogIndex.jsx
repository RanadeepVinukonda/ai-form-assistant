import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Card, Badge } from "../components/ui"

const posts = [
  {
    slug: "how-to-fill-ds160",
    category: "visa",
    title: "How to Fill DS-160: Step-by-Step Guide for US Visa Application",
    excerpt: "Complete walkthrough of every section of the DS-160 form, with tips for common mistakes.",
    date: "2026-01-15",
    readTime: "8 min",
    tags: ["ds-160", "visa", "usa"],
  },
  {
    slug: "itr-1-filing-guide",
    category: "tax",
    title: "ITR-1 Filing Guide: Everything You Need to Know",
    excerpt: "Learn how to file ITR-1 (Sahaj) for salaried individuals with deductions and tax calculations.",
    date: "2026-01-10",
    readTime: "6 min",
    tags: ["itr-1", "tax", "india"],
  },
  {
    slug: "passport-renewal-online",
    category: "government",
    title: "Indian Passport Renewal: Complete Online Process",
    excerpt: "Step-by-step guide for renewing your Indian passport online through Passport Seva.",
    date: "2026-01-05",
    readTime: "5 min",
    tags: ["passport", "india", "renewal"],
  },
]

export default function BlogIndex() {
  return (
    <div className="section-container py-8 space-y-6">
      <Helmet>
        <title>Guides & Blog — AI Form Assistant</title>
        <meta name="description" content="Step-by-step guides for filling government forms, visa applications, tax returns, and more." />
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold">Guides &amp; Blog</h1>
        <p className="text-sm text-gray-500 mt-1">Step-by-step tutorials for filling government forms.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.category}/${post.slug}`}>
            <Card className="p-5 h-full hover:shadow-md transition-shadow group">
              <Badge variant="default">{post.category}</Badge>
              <h2 className="font-semibold mt-3 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-4">
                <span>{post.date}</span>
                <span>{post.readTime} read</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-400 px-2 py-0.5 rounded">#{tag}</span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


