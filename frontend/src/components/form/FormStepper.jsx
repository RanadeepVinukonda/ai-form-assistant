export default function FormStepper({ sections, sectionLabels, currentSection, onNavigate }) {
  return (
    <nav aria-label="Form sections" className="overflow-x-auto">
      <div className="flex gap-2 min-w-max p-1">
        {sections.map((key, index) => {
          const isActive = index === currentSection
          const isDone = index < currentSection
          return (
            <button
              key={key}
              onClick={() => onNavigate(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? "bg-primary text-white shadow-sm" : isDone ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? "bg-white/20" : isDone ? "bg-primary text-white" : "bg-gray-300 text-gray-600"}`}>
                {isDone ? "\u2713" : index + 1}
              </span>
              <span className="hidden sm:inline">{sectionLabels?.[key] || key}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
