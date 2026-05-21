import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import SkipToContent from "./components/ui/SkipToContent"

const Home = lazy(() => import("./routes/Home"))
const FormCatalog = lazy(() => import("./routes/FormCatalog"))
const FormPage = lazy(() => import("./routes/FormPage"))
const FormFill = lazy(() => import("./routes/FormFill"))
const OCRPage = lazy(() => import("./routes/OCRPage"))
const ChatPage = lazy(() => import("./routes/ChatPage"))
const Dashboard = lazy(() => import("./routes/Dashboard"))
const SavedForms = lazy(() => import("./routes/SavedForms"))
const SettingsPage = lazy(() => import("./routes/SettingsPage"))
const AuthPage = lazy(() => import("./routes/AuthPage"))
const Pricing = lazy(() => import("./routes/Pricing"))
const BlogIndex = lazy(() => import("./routes/BlogIndex"))
const BlogPost = lazy(() => import("./routes/BlogPost"))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="loading loading-spinner loading-lg text-primary"></div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forms" element={<FormCatalog />} />
            <Route path="/forms/:category" element={<FormCatalog />} />
            <Route path="/forms/:category/:slug" element={<FormPage />} />
            <Route path="/fill/:category/:slug" element={<FormFill />} />
            <Route path="/ocr" element={<OCRPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/forms" element={<SavedForms />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:category/:slug" element={<BlogPost />} />
            <Route path="/:category/:slug" element={<FormPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
