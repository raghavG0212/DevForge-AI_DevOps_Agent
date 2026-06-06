import { useSelector } from 'react-redux'
import GlassCard from '../common/GlassCard'

const ProgressBar = () => {

  const { progress } = useSelector(
    (state) => state.workflow
  )

  return (

    <GlassCard
      className="
      w-full
      max-w-[800px]
      mx-auto

      min-h-[220px]
      "
    >

      <h2 className="text-2xl font-bold mb-8">
        Workflow Progress
      </h2>

      <div
        className="
        w-full
        h-5

        rounded-full

        bg-[#0f172a]

        overflow-hidden
        "
      >

        <div
          style={{
            width: `${progress}%`
          }}
          className="
          h-full

          bg-linear-to-r
          from-blue-500
          to-cyan-400

          transition-all
          duration-500
          "
        />

      </div>

      <div className="mt-5 text-gray-300">
        {progress}% Completed
      </div>

    </GlassCard>

  )
}

export default ProgressBar