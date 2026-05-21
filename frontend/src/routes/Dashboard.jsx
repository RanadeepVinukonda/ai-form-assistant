import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { FileText, MessageSquare, Settings, User, Clock, ArrowRight } from "lucide-react"
import { Button, Card, Badge } from "../components/ui"
import { useAuth } from "../contexts/AuthContext"

export default function Dashboard() {
  const { user, profile, loading } = useAuth()

  if (loading) return <div className="flex justify-center py-16"><span className="loading loading-spinner loading-lg"></span></div>

  if (!user) return (
    <div className="section-container py-16 text-center space-y-4">
      <User className="h-12 w-12 mx-auto text-gray-300" />
      <h1 className="text-2xl font-bold">Sign In to View Dashboard</h1>
      <p className="text-gray-500">Save forms, track progress, and access your history.</p>
      <Link to="/auth"><Button>Sign In</Button></Link>
    </div>
  )

  return (
    <div className="section-container py-8 space-y-6">
      <Helmet><title>Dashboard — AI Form Assistant</title></Helmet>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user.displayName || user.email?.split("@")[0] || "User"}</p>
        </div>
        <Badge variant={profile?.tier === "pro" ? "success" : "default"}>{profile?.tier === "pro" ? "Pro" : "Free"}</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/dashboard/forms">
          <Card className="p-5 hover:shadow-md transition-shadow">
            <FileText className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold text-sm">My Forms</h3>
            <p className="text-xs text-gray-500 mt-1">View and continue saved forms</p>
          </Card>
        </Link>
        <Link to="/chat">
          <Card className="p-5 hover:shadow-md transition-shadow">
            <MessageSquare className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold text-sm">AI Chat</h3>
            <p className="text-xs text-gray-500 mt-1">Ask questions about any form</p>
          </Card>
        </Link>
        <Link to="/dashboard/settings">
          <Card className="p-5 hover:shadow-md transition-shadow">
            <Settings className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold text-sm">Settings</h3>
            <p className="text-xs text-gray-500 mt-1">Manage account and preferences</p>
          </Card>
        </Link>
      </div>

      {/* Recent activity */}
      <Card className="p-5">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Clock className="h-4 w-4 text-gray-400" /> Recent Activity</h3>
        <p className="text-sm text-gray-400 text-center py-6">No recent activity. Start filling a form to see it here.</p>
        <div className="text-center"><Link to="/forms"><Button size="sm" variant="outline">Browse Forms <ArrowRight className="h-3 w-3" /></Button></Link></div>
      </Card>

      {/* Quick links */}
      <Card className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold">Upgrade to Pro</h3>
            <p className="text-sm text-gray-600 mt-1">Unlimited AI suggestions, PDF export, and priority support.</p>
          </div>
          <Link to="/pricing"><Button size="sm">View Plans</Button></Link>
        </div>
      </Card>
    </div>
  )
}
