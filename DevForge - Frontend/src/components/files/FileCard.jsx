import {
  FaDocker,
  FaDownload,
  FaEye,
  FaServer,
  FaKey,
  FaCodeBranch,
  FaCogs,
  FaFileCode,
  FaInfoCircle
} from 'react-icons/fa'

import { downloadFile } from '../../utils/downloadFile'

const FileCard = ({ file, onView, onExplain}) => {
  const getFileIcon = (fileName) => {

    const name = fileName.toLowerCase()

    if (name === 'dockerfile')
      return <FaDocker className="text-blue-400 text-xl" />

    if (name.includes('docker-compose'))
      return <FaCogs className="text-cyan-400 text-xl" />

    if (name.includes('nginx'))
      return <FaServer className="text-green-400 text-xl" />

    if (name.includes('.env'))
      return <FaKey className="text-yellow-400 text-xl" />

    if (name.includes('.gitignore'))
      return <FaCodeBranch className="text-purple-400 text-xl" />

    return <FaFileCode className="text-gray-400 text-xl" />
  }

  const getFileSize = (content) => {
    const bytes = new Blob([content]).size

    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return (

    <div
      className="
      bg-[#0f172a]
      border
      border-white/10

      rounded-2xl

      px-8
      py-5

      min-h-[90px]

      grid
      grid-cols-[auto_1fr_auto]
      items-center

      gap-6
      "
    >

      <div
        className="
  w-12
  h-12

  rounded-xl

  bg-white/5

  flex
  items-center
  justify-center
  "
      >
        {getFileIcon(file.fileName)}
      </div>

      <div>

        <h3
          title={file.fileName}
          className="font-semibold truncate overflow-hidden whitespace-nowrap max-w-full"
        >
          {file.fileName}
        </h3>

        <p className="text-sm text-gray-400">
          {getFileSize(file.content)}
        </p>

      </div>

      <div
        className="
  flex
  items-center
  gap-2
  shrink-0
  "
      >

        <button
          title="View File"
          onClick={onView}
          className="
    w-11
    h-11

    rounded-xl

    bg-white/5
    border
    border-white/10

    hover:bg-red-600/10
    hover:scale-110
    transition-transform
    duration-200
    flex
    items-center
    justify-center

    cursor-pointer
    "
        >
          <FaEye />
        </button>

        <button
          title="Explain File"
          onClick={onExplain}
          className="
    w-11
    h-11

    rounded-xl
     bg-white/5
    border
    border-white/10

    hover:bg-red-600/10
    hover:scale-110
    transition-transform
    duration-200

    flex
    items-center
    justify-center

    cursor-pointer
    "
        >
          <FaInfoCircle />
        </button>

        <button
          title="Download File"
          onClick={() =>
            downloadFile(
              file.content,
              file.fileName
            )
          }
          className="
    w-11
    h-11

    rounded-xl
     bg-white/5
    border
    border-white/10

    hover:bg-red-600/10
    hover:scale-110
    transition-transform
    duration-200

    flex
    items-center
    justify-center

    cursor-pointer
    "
        >
          <FaDownload />
        </button>

      </div>

    </div>

  )
}

export default FileCard