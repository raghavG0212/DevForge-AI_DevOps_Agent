import { FaCube } from 'react-icons/fa'

const Header = () => {

  return (

    <header
      className="
      sticky
      top-0
      z-50

      border-b
      border-white/10

      bg-[#020617]/80
      backdrop-blur-xl
      "
    >

      <div
        className="
        w-full

        px-10
        py-5

        flex
        items-center
        justify-start
        "
      >

        {/* LEFT SECTION */}

        <div className="flex items-center gap-3">

          <div
            className="
            w-14
            h-14

            rounded-2xl

            bg-blue-500/10
            border
            border-blue-500/20

            flex
            items-center
            justify-center

            shrink-0
            "
          >

            <FaCube className="text-blue-400 text-[24px]" />

          </div>

          <div className="leading-tight">

            <h1
              className="
              text-[36px]
              font-bold
              tracking-tight
              "
            >
              DevForge AI
            </h1>

            <p
              className="
              text-sm
              text-gray-400
              mt-1
              "
            >
              AI Powered Deployment Assistant
            </p>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div
          className="
          hidden
          md:flex

          items-center

          ml-auto
          mr-6

          px-4
          py-2

          rounded-full

          bg-green-500/10
          border
          border-green-500/20

          text-green-400
          text-sm
          "
        >

          ● Systems Operational

        </div>

      </div>

    </header>

  )

}

export default Header