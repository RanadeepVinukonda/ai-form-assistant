const API_BASE = import.meta.env.VITE_API_URL || "/api"

async function request(path, options = {}) {
  const { body, ...rest } = options
  const headers = { "Content-Type": "application/json", ...rest.headers }
  const token = localStorage.getItem("firebase_token")
  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `Request failed (${res.status})`)
  }

  return res.json()
}

export const api = {
  vision: {
    extract: (image, mime) => request("/vision/extract", { method: "POST", body: { image, mime } }),
  },
  analyze: {
    document: (text) => request("/analyze", { method: "POST", body: { text } }),
    explain: (fieldLabel, documentTitle) => request("/analyze/explain", { method: "POST", body: { fieldLabel, documentTitle } }),
    suggest: (fieldLabel, documentTitle, otherFields) => request("/analyze/suggest", { method: "POST", body: { fieldLabel, documentTitle, otherFields } }),
  },
  userForms: {
    list: () => request("/user-forms"),
    get: (id) => request(`/user-forms/${id}`),
    save: (data) => request("/user-forms", { method: "POST", body: data }),
    remove: (id) => request(`/user-forms/${id}`, { method: "DELETE" }),
  },
  translate: (text, targetLang) =>
    request("/translate", { method: "POST", body: { text, targetLang } }),
  chat: (messages, formContext) =>
    request("/chat", { method: "POST", body: { messages, formContext } }),
}
