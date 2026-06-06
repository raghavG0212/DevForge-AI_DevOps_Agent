import { motion } from 'framer-motion'

import {
  FaBrain,
  FaServer,
  FaLayerGroup,
  FaDocker,
} from 'react-icons/fa'

const cleanText = (text) => {

  if (!text) return ''

  return text
    .replace(/\*\*/g, '')
    .replace(/#+/g, '')
    .replace(/`/g, '')
}

const getIcon = (title) => {

  if (title.includes('Backend'))
    return <FaServer />

  if (title.includes('Frontend'))
    return <FaLayerGroup />

  if (title.includes('DevOps'))
    return <FaDocker />

  return <FaBrain />
}

const isHeading = (line) => {

  const headings = [
    'Overview:',
    'Backend:',
    'Frontend:',
    'DevOps:'
  ]

  return headings.includes(line.trim())
}

const buildSections = (text) => {

  const cleaned = cleanText(text)

  const normalized = cleaned
    .replace(/Overview:/g, '\nOverview:')
    .replace(/Backend:/g, '\nBackend:')
    .replace(/Frontend:/g, '\nFrontend:')
    .replace(/DevOps:/g, '\nDevOps:')

  const lines = normalized
    .split('\n')
    .filter(line => line.trim() !== '')

  const sections = []

  let currentSection = null

  lines.forEach((line) => {

    if (isHeading(line.trim())) {

      if (currentSection) {
        sections.push(currentSection)
      }

      currentSection = {
        heading: line.trim(),
        content: []
      }

    } else {

      if (!currentSection) {

        currentSection = {
          heading: 'Overview:',
          content: []
        }
      }

      currentSection.content.push(line.trim())
    }
  })

  if (currentSection) {
    sections.push(currentSection)
  }

  const mergedSections = []

  sections.forEach((section) => {

    const last = mergedSections[mergedSections.length - 1]

    if (
      last &&
      last.heading === section.heading
    ) {

      last.content.push(...section.content)

    } else {

      mergedSections.push(section)

    }

  })

  return mergedSections
}

const ProjectAnalysis = ({ data }) => {

  const sections = buildSections(
    data?.readmeAnalysis || ''
  )

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}

      className="
      w-full
      flex
      justify-center
      "
    >

      <div
        className="
        w-full
        max-w-[1360px]

        rounded-[38px]

        border
        border-white/10

        bg-gradient-to-br
        from-[#07101d]
        to-[#040816]

        px-12
        lg:px-16

        pt-24
        pb-16
        "
      >

        {/* HEADER */}

        <div className="text-center mb-12">

          <div
            className="
            flex
            items-center
            justify-center
            gap-4
            mb-4
            flex-wrap
            "
          >

            <h2
              className="
              text-5xl
              font-bold
              tracking-tight
              "
            >
              Project Analysis
            </h2>

            <div
              className="
              px-4
              py-1.5

              rounded-full

              border
              border-blue-500/20

              bg-blue-500/10

              text-blue-400
              text-sm
              "
            >
              AI Generated
            </div>

            <div
              className={`
              px-4
              py-1.5

              rounded-full

              border

              text-sm

              ${
                data?.confidence === 'High'
                  ? `
                  border-green-500/20
                  bg-green-500/10
                  text-green-400
                  `
                  : `
                  border-yellow-500/20
                  bg-yellow-500/10
                  text-yellow-400
                  `
              }
              `}
            >
              {data?.confidence || 'High'} Confidence
            </div>

          </div>

          <p
            className="
            text-gray-400
            text-lg
            "
          >
            AI-generated architecture understanding
          </p>

        </div>

        {/* CONTENT */}

        <div
          className="
          w-full

          flex
          flex-col
          items-center

          gap-8
          "
        >

          {sections.map((section, index) => (

            <div
              key={index}

              className="
              w-full
              max-w-[1180px]

              rounded-[28px]

              border
              border-white/5

              bg-[#0b1528]

              px-8
              py-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-4

                mb-6
                "
              >

                <div
                  className="
                  w-12
                  h-12

                  rounded-2xl

                  bg-blue-500/10

                  flex
                  items-center
                  justify-center

                  text-blue-400
                  text-lg

                  shrink-0
                  "
                >
                  {getIcon(section.heading)}
                </div>

                <h3
                  className="
                  text-[28px]
                  font-semibold
                  "
                >
                  {section.heading}
                </h3>

              </div>

              <div
                className="
                space-y-5

                pl-8
                pr-8
                "
              >

                {section.content.map((line, i) => (

                  <p
                    key={i}

                    className="
                    text-[18px]
                    text-gray-300

                    leading-10

                    text-left
                    "
                  >
                    {line.replace(/^-\s*/, '')}
                  </p>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </motion.div>

  )
}

export default ProjectAnalysis