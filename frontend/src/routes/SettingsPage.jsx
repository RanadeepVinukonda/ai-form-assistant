import { Helmet } from "react-helmet-async"
import { Card } from "../components/ui"

export default function SettingsPage() {
  return (
    <div className="section-container py-8 space-y-6">
      <Helmet><title>Settings — AI Form Assistant</title></Helmet>
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <Card className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Language Preference</label>
          <select className="w-full max-w-xs h-10 px-3 rounded-lg border border-gray-300 text-sm">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Theme</label>
          <select className="w-full max-w-xs h-10 px-3 rounded-lg border border-gray-300 text-sm">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">Account management (delete, export data) coming soon.</p>
        </div>
      </Card>
    </div>
  )
}
