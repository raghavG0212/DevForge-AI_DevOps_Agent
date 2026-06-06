import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { explainApi } from '../../api/explainApi'

const ExplainModal = ({ file, onClose }) => {

	const [loading, setLoading] = useState(false)
	const [explanation, setExplanation] = useState('')

	useEffect(() => {

		if (!file) return

		loadExplanation()

	}, [file])

	const loadExplanation = async () => {

		try {

			setLoading(true)
			setExplanation('')

			const response = await explainApi({
				fileName: file.fileName,
				content: file.content
			})

			setExplanation(response)

		} catch (err) {

			console.error(err)

			setExplanation(
				'Failed to generate explanation.'
			)

		} finally {

			setLoading(false)
		}
	}

	if (!file) return null

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
						Explain • {file.fileName}
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
          max-h-[65vh]
          "
				>

					{
						loading ? (
							<div
								className="
                text-center
                text-gray-400
                py-10
                "
							>
								Generating explanation...
							</div>
						) : (
							<pre
								className="
                whitespace-pre-wrap
                break-words

                text-sm

                text-blue-200
                "
							>
								{explanation}
							</pre>
						)
					}

				</div>

			</div>

		</div>
	)
}

export default ExplainModal