import { useState } from 'react'

import GlassCard from '../common/GlassCard'
import ErrorResult from './ErrorResult'
import toast from 'react-hot-toast'
import { analyzeErrorApi } from '../../api/errorApi'

const ErrorAnalyzer = () => {

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {

    if (!error.trim()){
      toast.error('Please enter an error log')
      return
    } 

    try {

      setLoading(true)

      const response =
        await analyzeErrorApi({
          error,
          context: ''
        })

      setResult(response)
      toast.success('Error analyzed successfully')

    } catch (err) {

      console.error(err)

toast.error('Failed to analyze error')

    } finally {

      setLoading(false)

    }

  }

  return (

    <GlassCard
      className="
      w-full
      max-w-[1100px]

      mx-auto
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        Error Analyzer
      </h2>

      <textarea
        value={error}
        onChange={(e) =>
          setError(e.target.value)
        }
        placeholder="Paste deployment or DevOps error here"
        className="
        w-full
        h-[220px]

        rounded-2xl

        bg-[#0f172a]

        border
        border-white/10

        p-5

        outline-none
        resize-none
        "
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="
        mt-6

        px-10
        py-3

        rounded-xl

        bg-red-600
        hover:bg-red-700

        transition-all

        cursor-pointer

        disabled:opacity-50
        "
      >

        <>
{
 loading && (
   <span
     className="
     inline-block
     w-4
     h-4

     border-2
     border-white/30
     border-t-white

     rounded-full

     animate-spin

     mr-2
     "
   />
 )
}

{
 loading
 ? 'Analyzing...'
 : 'Analyze Error'
}
</>

      </button>

      <ErrorResult
        result={result}
      />

    </GlassCard>

  )
}

export default ErrorAnalyzer