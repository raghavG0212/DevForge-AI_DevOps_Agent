import useTypewriter from '../../hooks/useTypewriter'

const TypewriterText = ({
  text,
  speed = 8,
  className = ''
}) => {

  const displayedText = useTypewriter(
    text,
    speed
  )

  return (

    <p
      className={className}
    >
      {displayedText}

      <span className="animate-pulse text-blue-400">
        |
      </span>

    </p>

  )
}

export default TypewriterText