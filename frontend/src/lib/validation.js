export function validateField(field, value) {
  if (field.required && (!value || value === "")) return `${field.label} is required`
  if (!value || value === "") return null

  if (field.type === "email") {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(value)) return "Enter a valid email address"
  }

  if (field.pattern) {
    const re = new RegExp(field.pattern)
    if (!re.test(value)) return field.errorMessage || `Invalid format for ${field.label}`
  }

  if (field.min && Number(value) < field.min) return `Minimum value is ${field.min}`
  if (field.max && Number(value) > field.max) return `Maximum value is ${field.max}`
  if (field.maxLength && String(value).length > field.maxLength) return `Maximum ${field.maxLength} characters`

  return null
}

export function validateSchema(schema, data) {
  const errors = {}
  for (const field of schema) {
    if (!field.dependsOn || data[field.dependsOn.field] === field.dependsOn.value) {
      const err = validateField(field, data[field.id])
      if (err) errors[field.id] = err
    }
  }
  return errors
}

export function calculateProgress(schema, data) {
  if (!schema || schema.length === 0) return 0
  const visible = schema.filter((f) => !f.dependsOn || data[f.dependsOn.field] === f.dependsOn.value)
  const filled = visible.filter((f) => data[f.id] && data[f.id] !== "")
  if (visible.length === 0) return 0
  return Math.round((filled.length / visible.length) * 100)
}
