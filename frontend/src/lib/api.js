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
  forms: {
    list: (category) => request(`/forms${category ? `?category=${category}` : ""}`),
    get: (slug) => request(`/forms/${slug}`),
    explain: (slug, fieldId) => request(`/forms/${slug}/explain`, { method: "POST", body: { fieldId } }),
    suggest: (slug, fieldId, formData) => request(`/forms/${slug}/suggest`, { method: "POST", body: { fieldId, formData } }),
    validate: (slug, data) => request(`/forms/${slug}/validate`, { method: "POST", body: data }),
  },
  userForms: {
    list: () => request("/user-forms"),
    get: (id) => request(`/user-forms/${id}`),
    save: (data) => request("/user-forms", { method: "POST", body: data }),
    remove: (id) => request(`/user-forms/${id}`, { method: "DELETE" }),
  },
  ocr: {
    autoFill: (formSlug, extractedText, language) =>
      request("/ocr/auto-fill", { method: "POST", body: { formSlug, extractedText, language } }),
  },
  translate: (text, targetLang) =>
    request("/translate", { method: "POST", body: { text, targetLang } }),
  chat: (messages, formContext) =>
    request("/chat", { method: "POST", body: { messages, formContext } }),
}
