const GeometricPattern = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="w-full h-full opacity-10" viewBox="0 0 400 400">
        <defs>
          <pattern id="mandala" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M100,20 L100,180 M20,100 L180,100 M35,35 L165,165 M165,35 L35,165" stroke="currentColor" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mandala)" className="text-sage-400 dark:text-indigo-400"/>
      </svg>
    </div>
  )
}

export default GeometricPattern