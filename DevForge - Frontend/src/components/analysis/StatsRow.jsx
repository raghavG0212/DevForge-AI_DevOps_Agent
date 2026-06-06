import {
  FaShieldAlt,
  FaFileAlt,
  FaLayerGroup,
  FaCheckCircle,
} from 'react-icons/fa'

const StatCard = ({
  icon,
  title,
  value,
  color,
}) => {

  return (

    <div
      className="
      rounded-[28px]

      border
      border-white/10

      bg-[#081120]

      px-8
      py-7

      flex
      items-center

      gap-5
      "
    >

      <div
        className={`
        w-14
        h-14

        rounded-2xl

        flex
        items-center
        justify-center

        text-2xl

        ${color}
        bg-white/5
        `}
      >
        {icon}
      </div>

      <div>

        <p
          className="
          text-gray-400
          text-sm
          "
        >
          {title}
        </p>

        <h3
          className="
          text-2xl
          font-bold
          mt-1
          "
        >
          {value}
        </h3>

      </div>

    </div>

  )
}

const StatsRow = ({ data }) => {

  const generatedFiles =
    data?.generatedFiles?.length || 0

  const sections = 4

  return (

    <div
      className="
      w-full
      max-w-[1360px]

      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4

      gap-6
      "
    >

      <StatCard
        icon={<FaShieldAlt />}
        title="Confidence"
        value={data?.confidence || 'High'}
        color="text-green-400"
      />

      <StatCard
        icon={<FaFileAlt />}
        title="Files Generated"
        value={generatedFiles}
        color="text-blue-400"
      />

      <StatCard
        icon={<FaLayerGroup />}
        title="Sections"
        value={sections}
        color="text-cyan-400"
      />

      <StatCard
        icon={<FaCheckCircle />}
        title="Status"
        value="Ready"
        color="text-emerald-400"
      />

    </div>

  )
}

export default StatsRow