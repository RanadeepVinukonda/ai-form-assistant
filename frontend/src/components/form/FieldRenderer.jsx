import { Input, Select, Textarea, Badge } from "../ui"

export default function FieldRenderer({ field, value, error, onChange }) {
  if (field.dependsOn) return null

  const handleChange = (val) => onChange(field.id, val)

  const commonProps = {
    name: field.id,
    value: value || "",
    error,
    onChange: (e) => handleChange(e.target.value),
    placeholder: field.placeholder || `Enter ${field.label}`,
    required: field.required,
    maxLength: field.maxLength,
    min: field.min,
    max: field.max,
  }

  switch (field.type) {
    case "select":
      return <Select label={field.label} options={field.options || []} error={error} {...commonProps} />

    case "radio":
      return (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700">{field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}</legend>
          <div className="flex flex-wrap gap-4">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name={field.id} value={opt.value} checked={value === opt.value} onChange={(e) => handleChange(e.target.value)} className="radio radio-sm radio-primary" />
                {opt.label}
              </label>
            ))}
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </fieldset>
      )

    case "checkbox":
      return (
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={!!value} onChange={(e) => handleChange(e.target.checked)} className="checkbox checkbox-primary mt-0.5" />
          <span className="text-sm text-gray-700">{field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}</span>
        </label>
      )

    case "textarea":
      return <Textarea label={field.label} error={error} {...commonProps} />

    case "date":
      return <Input label={field.label} type="date" error={error} {...commonProps} />

    case "tel":
      return <Input label={field.label} type="tel" inputMode="numeric" error={error} {...commonProps} />

    case "number":
      return <Input label={field.label} type="number" error={error} {...commonProps} />

    case "email":
      return <Input label={field.label} type="email" inputMode="email" error={error} {...commonProps} />

    case "file":
      return (
        <div className="space-y-1">
          {field.label && <label className="block text-sm font-medium text-gray-700">{field.label}</label>}
          <input type="file" accept={field.accept || "*"} onChange={(e) => handleChange(e.target.files[0])} className="file-input file-input-bordered w-full text-sm" />
        </div>
      )

    default:
      return <Input label={field.label} type="text" error={error} {...commonProps} helpText={field.helpText} />
  }
}
