import GlassCard from '../common/GlassCard'

const logs = [
  'Project uploaded successfully',
  'Analyzing project structure',
  'Detecting stack',
  'Generating Dockerfile',
]

const LiveLogs = () => {
  return (
<GlassCard
  className="
  w-full
  max-w-[900px]
  mx-auto

  px-8
  py-8
  "
>
      <h2 className="text-2xl font-bold mb-6">Live Logs</h2>

  <div
  className="
  pl-4

  space-y-4
  font-mono
  text-sm
  text-green-400
  "
>
        {logs.map((log, index) => (
          <div key={index}>
            {'>'} {log}
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default LiveLogs