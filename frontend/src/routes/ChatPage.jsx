import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { MessageSquare, Send, Bot, User, Sparkles } from "lucide-react"
import { Card } from "../components/ui"
import { api } from "../lib/api"

const suggestions = ["What documents do I need for a US visa?", "How do I file ITR-1?", "What is a PAN number used for?", "How long does a passport take?"]

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I can help you with any government or visa form. Ask me anything about filling forms, required documents, deadlines, or fees." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSend(text) {
    const msg = text || input
    if (!msg.trim() || loading) return
    setInput("")
    setMessages((m) => [...m, { role: "user", content: msg }])
    setLoading(true)
    try {
      const res = await api.chat([...messages, { role: "user", content: msg }], {})
      setMessages((m) => [...m, { role: "assistant", content: res.reply || res.message || "No response available." }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't process that. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-container py-8 max-w-3xl mx-auto space-y-6">
      <Helmet>
        <title>AI Chat Support — AI Form Assistant</title>
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Form Assistant Chat</h1>
        <p className="text-sm text-gray-500 mt-1">Ask any question about government forms, visa applications, or required documents.</p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => handleSend(s)} disabled={loading} className="text-xs bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary px-3 py-1.5 rounded-full transition-colors">
            {s}
          </button>
        ))}
      </div>

      {/* Chat */}
      <Card className="h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"}`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${msg.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Bot className="h-4 w-4 text-primary" /></div>
              <div className="bg-gray-100 rounded-xl px-4 py-2.5"><span className="loading loading-dots loading-xs"></span></div>
            </div>
          )}
        </div>
        <div className="border-t p-3 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask about any form..." className="flex-1 h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" disabled={loading} />
          <button onClick={() => handleSend()} disabled={loading || !input.trim()} className="h-10 w-10 bg-primary text-white rounded-lg flex items-center justify-center disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}
