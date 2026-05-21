import { createContext, useContext, useReducer, useCallback } from "react"

const FormContext = createContext(null)

const initialState = {
  schema: null,
  data: {},
  errors: {},
  currentSection: 0,
  language: "en",
  status: "idle", // idle | filling | reviewing | completed
  progress: 0,
}

function formReducer(state, action) {
  switch (action.type) {
    case "SET_SCHEMA":
      return { ...initialState, schema: action.schema, language: action.language || state.language }
    case "SET_FIELD":
      return { ...state, data: { ...state.data, [action.fieldId]: action.value }, errors: { ...state.errors, [action.fieldId]: null } }
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.fieldId]: action.message } }
    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.errors } }
    case "SET_SECTION":
      return { ...state, currentSection: action.index }
    case "SET_LANGUAGE":
      return { ...state, language: action.language }
    case "SET_STATUS":
      return { ...state, status: action.status }
    case "SET_PROGRESS":
      return { ...state, progress: action.progress }
    case "LOAD_DATA":
      return { ...state, data: { ...state.data, ...action.data } }
    case "RESET":
      return { ...initialState, schema: state.schema }
    default:
      return state
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const setField = useCallback((fieldId, value) => dispatch({ type: "SET_FIELD", fieldId, value }), [])
  const setError = useCallback((fieldId, message) => dispatch({ type: "SET_ERROR", fieldId, message }), [])
  const setSection = useCallback((index) => dispatch({ type: "SET_SECTION", index }), [])
  const setLanguage = useCallback((language) => dispatch({ type: "SET_LANGUAGE", language }), [])
  const setStatus = useCallback((status) => dispatch({ type: "SET_STATUS", status }), [])
  const setProgress = useCallback((progress) => dispatch({ type: "SET_PROGRESS", progress }), [])
  const loadSchema = useCallback((schema, language) => dispatch({ type: "SET_SCHEMA", schema, language }), [])
  const loadData = useCallback((data) => dispatch({ type: "LOAD_DATA", data }), [])
  const reset = useCallback(() => dispatch({ type: "RESET" }), [])

  const value = { state, setField, setError, setSection, setLanguage, setStatus, setProgress, loadSchema, loadData, reset }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useForm() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error("useForm must be inside FormProvider")
  return ctx
}
