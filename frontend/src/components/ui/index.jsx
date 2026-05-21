export function Button({ children, variant = "primary", size = "md", className = "", loading, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-amber-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && <span className="loading loading-spinner loading-xs"></span>}
      {children}
    </button>
  )
}

export function Input({ label, error, helpText, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input className={`w-full h-10 px-3 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${className}`} {...props} />
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      {error && <p className="text-xs text-red-600 flex items-center gap-1"><span>⚠</span> {error}</p>}
    </div>
  )
}

export function Select({ label, error, options, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select className={`w-full h-10 px-3 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm bg-white ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <textarea className={`w-full px-3 py-2 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-h-[80px] ${className}`} {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function ProgressBar({ value, label }) {
  return (
    <div className="space-y-1">
      {label && <div className="flex justify-between text-xs text-gray-500"><span>{label}</span><span>{value}%</span></div>}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function Badge({ children, variant = "default" }) {
  const variants = { default: "bg-blue-100 text-blue-700", success: "bg-green-100 text-green-700", warning: "bg-amber-100 text-amber-700", danger: "bg-red-100 text-red-700" }
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>
}

export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-black/30 absolute inset-0" />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[70vh] overflow-y-auto shadow-xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        {children}
      </div>
    </div>
  )
}
