import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaGithub, FaUpload } from 'react-icons/fa'
import toast from 'react-hot-toast'

import Loader from '../common/Loader'

import {
  analyzeProjectApi,
  analyzeZipApi,
} from '../../api/analyzeApi'

import {
  setLoading,
  setProgress,
  setCurrentStep,
  addLog,
} from '../../redux/slices/workflowSlice'

const UploadCard = () => {

  const [githubLink, setGithubLink] = useState('')
  const [zipFile, setZipFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const MAX_FILE_SIZE_MB = 250
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const timeoutRefs = useRef([])


  const fakeWorkflowProgress = () => {

    timeoutRefs.current = []

    const progressSteps = [
      {
        progress: 10,
        step: 1,
        log: 'Project uploaded',
        delay: 0,
      },
      {
        progress: 20,
        step: 1,
        log: 'Uploading project',
        delay: 700,
      },
      {
        progress: 30,
        step: 2,
        log: 'Extracting source files',
        delay: 1400,
      },
      {
        progress: 40,
        step: 2,
        log: 'Analyzing project structure',
        delay: 2100,
      },
      {
        progress: 50,
        step: 3,
        log: 'Scanning dependencies',
        delay: 2800,
      },
      {
        progress: 60,
        step: 3,
        log: 'Detecting technologies',
        delay: 3500,
      },
      {
        progress: 70,
        step: 4,
        log: 'Generating DevOps files',
        delay: 4200,
      },
      {
        progress: 80,
        step: 4,
        log: 'Preparing configurations',
        delay: 4900,
      },
      {
        progress: 90,
        step: 4,
        log: 'Finalizing output',
        delay: 5600,
      },
    ]

    progressSteps.forEach((item) => {

      const timer = setTimeout(() => {

        dispatch(setProgress(item.progress))
        dispatch(setCurrentStep(item.step))
        dispatch(addLog(item.log))

      }, item.delay)

      timeoutRefs.current.push(timer)

    })

  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (
      e.type === 'dragenter' ||
      e.type === 'dragover'
    ) {
      setDragActive(true)
    }

    if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {

    e.preventDefault()
    e.stopPropagation()

    setDragActive(false)

    const file = e.dataTransfer.files?.[0]

    if (!file) return

    if (!file.name.endsWith('.zip')) {

      toast.error(
        'Only ZIP files are supported'
      )

      return
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {

      toast.error(
        `ZIP file exceeds ${MAX_FILE_SIZE_MB} MB limit`
      )

      return
    }

    setZipFile(file)

  }

  const handleAnalyze = async () => {

    if (!githubLink.trim() && !zipFile) {
      toast.error('Provide GitHub URL or ZIP file')
      return
    }

    try {

      setIsLoading(true)
      dispatch(setLoading(true))

      fakeWorkflowProgress()

      let response

      if (zipFile) {

        console.log("Starting ZIP upload")

        response = await analyzeZipApi(zipFile)

        console.log("Received response", response)

      } else {

        response = await analyzeProjectApi({
          input: githubLink,
        })
      }

      if (!response.success) {
        toast.error(response.error)
        return
      }
      timeoutRefs.current.forEach(clearTimeout)

      dispatch(setProgress(100))
      dispatch(setCurrentStep(4))
      dispatch(addLog('DevOps generation completed'))

      toast.success(
        'DevOps files generated successfully'
      )

      await new Promise(resolve =>
        setTimeout(resolve, 600)
      )

      navigate('/dashboard', {
        state: {
          responseData: response,
        },
      })

    }
    catch (error) {

      console.log(error)

      timeoutRefs.current.forEach(clearTimeout)

      toast.error(
        'Failed to analyze project'
      )

    }

    finally {

      setIsLoading(false)
      dispatch(setLoading(false))
    }
  }

  return (

    <>
      {loading && <Loader />}

      <div
        className="
        w-full
        max-w-[850px]

        rounded-[40px]

        px-10
        py-12

        bg-linear-to-br
        from-[#091120]
        via-[#111a30]
        to-[#16254a]

        border
        border-white/10

        backdrop-blur-xl
        shadow-[0_0_50px_rgba(59,130,246,0.08)]
        "
      >

        <div
          className="
          flex
          flex-col
          items-center
          gap-10
          "
        >

          <div
            className="
            flex
            flex-col
            items-center
            "
          >

            <h2
              className="
              text-4xl
              font-bold
              "
            >
              Upload Project
            </h2>

            <p
              className="
              text-gray-400
              text-lg
              mt-4
              "
            >
              Upload ZIP or paste GitHub repository
            </p>

          </div>

          {/* ZIP Upload */}

          <div
            onClick={() =>
              document
                .getElementById('zipUpload')
                .click()
            }

            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}

            className={`
    w-full
    max-w-[700px]

    h-[220px]

    border-2
    border-dashed

    rounded-3xl

    bg-[#0f172a]

    flex
    flex-col
    items-center
    justify-center

    gap-4

    cursor-pointer

    transition-all

    ${dragActive
                ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
                : 'border-blue-500/40 hover:border-blue-500'
              }
  `}
          >

            <FaUpload
              className="
              text-5xl
              text-blue-400
              "
            />

            <h3 className="text-xl font-semibold">
              Upload Project ZIP
            </h3>

            <p className="text-gray-400">
              Drag & Drop ZIP here or Click to Browse
            </p>

            {zipFile && (
              <div
                className="
                flex
                flex-col
                items-center
                gap-2
                "
              >

                {zipFile && (
                  <p className="text-green-400 text-sm">
                    {zipFile.name} • {(zipFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()

                    setZipFile(null)

                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="
                  text-red-400
                  text-sm
                  hover:text-red-300
                  "
                >
                  Remove File
                </button>

              </div>
            )}

          </div>

          <input
            ref={fileInputRef}
            id="zipUpload"
            type="file"
            accept=".zip"
            hidden
            onChange={(e) => {

              const file = e.target.files?.[0]

              if (!file) return

              if (!file.name.endsWith('.zip')) {

                toast.error(
                  'Only ZIP files are supported'
                )

                e.target.value = ''

                return
              }

              if (file.size > 250 * 1024 * 1024) {

                toast.error(
                  'ZIP file exceeds 250 MB limit'
                )

                e.target.value = ''

                return
              }

              setZipFile(file)

            }}
          />

          <div
            className="
            text-gray-500
            font-medium
            "
          >
            OR
          </div>

          {/* Github Input */}

          <div
            className="
            w-full
            max-w-[700px]
            "
          >

            <div
              className="
              h-[74px]

              flex
              items-center

              gap-4

              bg-[#0f172a]

              border
              border-white/10

              rounded-2xl

              px-6
              "
            >

              <div
                className="
                w-12
                h-12

                flex
                items-center
                justify-center

                shrink-0
                "
              >

                <FaGithub
                  className="
                  text-[28px]
                  text-gray-500
                  "
                />

              </div>

              <input
                type="text"
                placeholder={
                  zipFile
                    ? 'ZIP selected'
                    : 'https://github.com/username/project'
                }
                value={githubLink}
                onChange={(e) =>
                  setGithubLink(
                    e.target.value
                  )
                }
                disabled={loading || zipFile}
                className="
                w-full
                bg-transparent

                text-lg
                text-white

                placeholder:text-gray-500

                outline-none
                "
              />

            </div>

          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
            w-full
            max-w-[700px]

            h-[70px]

            rounded-2xl

            bg-linear-to-r
            from-blue-600
            via-blue-500
            to-indigo-500

            font-semibold
            text-lg

            hover:scale-[1.02]

            transition-all

            cursor-pointer
            "
          >

            {
              loading
                ? 'Analyzing Project...'
                : 'Generate DevOps Files'
            }

          </button>

        </div>

      </div>

    </>
  )
}

export default UploadCard
