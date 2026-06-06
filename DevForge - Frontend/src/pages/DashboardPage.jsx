import { useLocation } from 'react-router-dom'

import Header from '../components/layout/Header'
import WorkflowSteps from '../components/workflow/WorkflowSteps'
import ProjectAnalysis from '../components/analysis/ProjectAnalysis'
import GeneratedFiles from '../components/files/GeneratedFiles'
import ErrorAnalyzer from '../components/error/ErrorAnalyzer'
import LiveLogs from '../components/workflow/LiveLogs'
import ProgressBar from '../components/workflow/ProgressBar'
import StatsRow from '../components/analysis/StatsRow'

import { useEffect } from 'react'

const DashboardPage = () => {

  const location = useLocation()
  const responseData = location.state?.responseData

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (

    <div className="min-h-screen bg-[#030712] text-white">

      <Header />

     <main
    //  style={{ paddingTop: '80px' }}
  className="
  w-full
  max-w-[1700px]
  mx-auto

  px-6
  xl:px-12

  p-20
  pb-10

  flex
  flex-col
  items-center

  gap-14
  
  "
>

  <WorkflowSteps />

  <StatsRow data={responseData}/>

  <ProjectAnalysis
    data={responseData}
  />


  <GeneratedFiles
    files={responseData?.generatedFiles || []}
    />
  

  <div
    className="
    w-full

    grid
    grid-cols-1
    lg:grid-cols-2

    gap-8
    "
  >
    <ProgressBar />
    <LiveLogs />
  </div>

  <div className=" flex justify-center">
  <ErrorAnalyzer />
</div>

</main>

    </div>

  )
}

export default DashboardPage