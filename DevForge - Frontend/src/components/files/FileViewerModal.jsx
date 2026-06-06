import { FaTimes, FaCopy } from 'react-icons/fa'
import toast from 'react-hot-toast'

const FileViewerModal = ({ file, onClose }) => {

  if (!file) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content)
    toast.success('Copied to clipboard')
  }

  return (

    <div
      className="
      fixed
      inset-0
      z-50

      bg-black/70

      flex
      items-center
      justify-center

      p-6
      "
    >

      <div
        className="
        w-full
        max-w-[1100px]

        max-h-[85vh]

        bg-[#081120]

        border
        border-white/10

        rounded-3xl

        overflow-hidden
        "
      >

        <div
          className="
          flex
          items-center
          justify-between

          px-8
          py-5

          border-b
          border-white/10
          "
        >

          <h2 className="text-2xl font-bold">
            {file.fileName}
          </h2>

          <button
            onClick={onClose}
            className="
            text-gray-400
            hover:text-white
            cursor-pointer
            "
          >
            <FaTimes size={20} />
          </button>

        </div>

        <div
          className="
          p-8

          overflow-auto
          max-h-[60vh]
          "
        >
          <pre
            className="
            whitespace-pre-wrap
            break-words

            text-sm
            font-mono

            text-green-300
            "
          >
            {file.content}
          </pre>
        </div>

        <div
          className="
          flex
          justify-end

          px-8
          py-5

          border-t
          border-white/10
          "
        >

          <button
            onClick={handleCopy}
            className="
            px-6
            py-3

            rounded-xl

            bg-blue-600
            hover:bg-blue-700

            flex
            items-center
            gap-2

            cursor-pointer
            "
          >
            <FaCopy />
            Copy Content
          </button>

        </div>

      </div>

    </div>

  )
}

export default FileViewerModal