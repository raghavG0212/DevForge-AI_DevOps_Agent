import { useState } from 'react'

import FileCard from './FileCard'
import FileViewerModal from './FileViewerModal'
import ExplainModal from './ExplainModal'

const GeneratedFiles = ({ files }) => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [explainFile, setExplainFile] =
    useState(null)

  return (

    <>
      <div
        className="
        w-full
        max-w-[1360px]
        mx-auto

        rounded-4xl
        border
        border-white/10

        bg-linear-to-br
        from-[#081120]
        to-[#050816]

        px-12
        py-10
        "
      >

        <div className="text-center mb-10">

          <h2 className="text-5xl font-bold">
            Generated Files
          </h2>

          <p className="text-gray-400 text-lg mt-4">
            Production-ready DevOps configuration
          </p>

        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2

          gap-x-12
          gap-y-8

          px-6
          "
        >

          {
            files.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onView={() => setSelectedFile(file)}
                onExplain={() => setExplainFile(file)}
              />
            ))
          }

        </div>

      </div>

      <FileViewerModal
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
      />

      <ExplainModal
        file={explainFile}
        onClose={() => setExplainFile(null)}
      />
    </>
  )
}

export default GeneratedFiles