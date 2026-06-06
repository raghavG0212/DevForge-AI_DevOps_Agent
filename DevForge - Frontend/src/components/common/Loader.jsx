import { useSelector } from 'react-redux'

const Loader = () => {

  const { progress } = useSelector(
    state => state.workflow
  )

  return (

    <div
      className="
      fixed
      inset-0
      z-[9999]

      bg-[#020617]

      flex
      flex-col
      items-center
      justify-center
      "
    >

      <div
        className="
        w-20
        h-20

        border-4
        border-blue-500/20
        border-t-blue-500

        rounded-full

        animate-spin
        "
      />

      <h2
        className="
        mt-8
        text-4xl
        font-bold
        "
      >
        DevForge AI
      </h2>

      <p
        className="
        mt-4
        text-gray-400
        text-lg
        "
      >
        Analyzing Repository...
      </p>

      <div
        className="
        w-[420px]
        h-3

        mt-8

        bg-[#0f172a]

        rounded-full
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

      <p
        className="
        mt-4
        text-gray-400
        "
      >
        {progress}% Complete
      </p>

    </div>

  )
}

export default Loader