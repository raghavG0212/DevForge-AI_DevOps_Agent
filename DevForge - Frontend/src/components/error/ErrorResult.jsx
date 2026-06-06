import { useEffect, useRef } from 'react'
import { FaBug } from 'react-icons/fa'

const ErrorResult = ({ result }) => {

  const resultRef = useRef(null)

  useEffect(() => {

    if (result && resultRef.current) {

      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

    }

  }, [result])

  if (!result) {

    return (

      <div
        className="
        mt-8

        rounded-2xl

        border
        border-dashed
        border-white/10

        bg-[#0f172a]/40

        p-10

        flex
        flex-col
        items-center
        justify-center

        text-center
        "
      >

        <FaBug
          className="
          text-4xl
          text-red-400/70
          mb-4
          "
        />

        <h3
          className="
          text-xl
          font-semibold
          mb-2
          "
        >
          No Analysis Yet
        </h3>

        <p
          className="
          text-gray-400
          max-w-[2500px]
          "
        >
          Paste a Docker, Kubernetes, Nginx, CI/CD or deployment
          error above and DevForge AI will analyze the issue,
          identify causes and suggest fixes.
        </p>

      </div>

    )

  }

  return (

    <div
      ref={resultRef}
      className="
      mt-8

      bg-[#0f172a]

      border
      border-white/10

      rounded-2xl

      p-6

      space-y-8
      "
    >

      <div>

        <h3 className="text-xl font-bold mb-3">
          Error Meaning
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {result.errorMeaning}
        </p>

      </div>

      <div>

        <h3 className="text-xl font-bold mb-3">
          Possible Causes
        </h3>

        <ul className="space-y-2 text-gray-300">

          {result.possibleCauses?.map(
            (cause, index) => (
              <li key={index}>
                • {cause}
              </li>
            )
          )}

        </ul>

      </div>

      <div>

        <h3 className="text-xl font-bold mb-3">
          Step-by-Step Fix
        </h3>

        <ol className="space-y-2 text-gray-300">

          {result.stepByStepFix?.map(
            (step, index) => (
              <li key={index}>
                {index + 1}. {step}
              </li>
            )
          )}

        </ol>

      </div>

      <div>

        <h3 className="text-xl font-bold mb-3">
          Extra Tips
        </h3>

        <ul className="space-y-2 text-gray-300">

          {result.extraTips?.map(
            (tip, index) => (
              <li key={index}>
                • {tip}
              </li>
            )
          )}

        </ul>

      </div>

    </div>

  )

}

export default ErrorResult