const GlassCard = ({ children, className = '' }) => {
  return (
    <div
      className={`
      bg-white/5
      border
      border-white/10
      rounded-3xl
      backdrop-blur-xl
      p-6
      shadow-xl
      shadow-blue-500/5
      ${className}
    `}
    >
      {children}
    </div>
  )
}

export default GlassCard