import { Helmet } from "react-helmet-async"
import { Card } from "../components/ui"

export default function SavedForms() {
  return (
    <div className="section-container py-8 space-y-6">
      <Helmet><title>My Forms — AI Form Assistant</title></Helmet>
      <h1 className="text-2xl font-bold">My Forms</h1>
      <Card className="p-6 text-center text-gray-500">
        <p>No saved forms yet. Start filling a form and it will appear here.</p>
      </Card>
    </div>
  )
}
