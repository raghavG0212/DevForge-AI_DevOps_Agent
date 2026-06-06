import Header from '../components/layout/Header'
import UploadCard from '../components/home/UploadCard'

const HomePage = () => {
  return (

    <div className="min-h-screen bg-[#020617] text-white">

      <Header />

      <div className="relative overflow-hidden">

        {/* background grid */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.15]
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-size-[50px_50px]
        "
        />

        <div
          className="
          relative
          z-10
          w-full
          flex
          flex-col
          items-center
          justify-center
          px-6
          pt-20
          pb-24
        "
        >

          <div
            className="
            mb-5
            px-5
            py-2
            rounded-full
            bg-blue-500/10
            border
            border-blue-500/20
            text-blue-400
            text-sm
          "
          >
            ⚡ AI Powered DevOps Automation
          </div>


          <h1
            className="
            text-center
            text-6xl
            lg:text-7xl
            font-bold
            leading-[1.2]
            max-w-300
            mx-auto
          "
          >

            Generate{" "}

            <span className="text-blue-500">
              Production Ready
            </span>

           

            DevOps Files Instantly

          </h1>


          <p
            className="
            mt-8
            text-center
            max-w-212.5
            text-gray-400
            text-xl
            leading-10
            mb-14
          "
          >

            Upload your project repository and let AI analyze
            your architecture, detect technologies and generate
            deployment-ready configurations.

          </p>

          <UploadCard/>
        </div>

      </div>

    </div>

  )
}

export default HomePage