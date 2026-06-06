import {
FaUpload,
FaBrain,
FaLayerGroup,
FaDocker,
} from 'react-icons/fa'

import { HiMiniChevronDoubleRight } from 'react-icons/hi2'

const steps=[
{
title:'Upload Project',
description:'Upload your code repository or ZIP file',
icon:<FaUpload/>,
iconColor:'text-blue-400',
border:'border-blue-500/20',
line:'from-blue-400',
glow:'shadow-blue-500/10',
},
{
title:'Analyze',
description:'AI analyzes your project structure and dependencies',
icon:<FaBrain/>,
iconColor:'text-purple-400',
border:'border-purple-500/20',
line:'from-purple-400',
glow:'shadow-purple-500/10',
},
{
title:'Detect Stack',
description:'Identify technologies and frameworks used',
icon:<FaLayerGroup/>,
iconColor:'text-cyan-400',
border:'border-cyan-500/20',
line:'from-cyan-400',
glow:'shadow-cyan-500/10',
},
{
title:'Generate Files',
description:'Generate production-ready DevOps configuration files',
icon:<FaDocker/>,
iconColor:'text-emerald-400',
border:'border-emerald-500/20',
line:'from-emerald-400',
glow:'shadow-emerald-500/10',
}
]

const WorkflowSteps=()=>{

return(

<section
  className="
  w-full

  flex
  justify-center

  mt-6
  "
>
 <div
  className="
  w-full
  max-w-[1500px]

  flex
  justify-center
  items-center

  gap-10
  flex-wrap
  "
>

{steps.map((step,index)=>(

<div
key={step.title}
className="relative"
>

<div
className={`

w-[310px]

rounded-[30px]
border
${step.border}

bg-[#081120]

p-8
min-h-[270px]

transition-all
duration-300

hover:-translate-y-2
hover:shadow-2xl

${step.glow}
`}
>

<div className="flex items-center gap-4 mb-6">

<div
className={`
w-[60px]
h-[60px]

rounded-2xl
border
${step.border}

flex
items-center
justify-center

text-[28px]

${step.iconColor}
shrink-0
`}
>
{step.icon}
</div>

<h3 className="text-2xl font-bold">
{step.title}
</h3>

</div>

<div
className={`
h-[1px]
w-full
bg-gradient-to-r
${step.line}
to-transparent
mb-6
`}
/>

<p
className="
text-gray-400
text-[17px]
leading-8
"
>
{step.description}
</p>

</div>

{index!==steps.length-1 && (

<HiMiniChevronDoubleRight
className="
absolute
top-1/2
-right-8
-translate-y-1/2
text-[28px]
text-blue-500/70
hidden
2xl:block
"
/>

)}

</div>

))}

</div>

</section>

)

}

export default WorkflowSteps