'use client'
import dynamic from 'next/dynamic'
const WorkCardGL = dynamic(()=>import('./WorkCardGL'),{ssr:false})
export default function WorkSection(){const data=['Aether','Kinetic','Nocturne'];return <section id="work" className="px-12 py-28"><h2 className="text-h1 font-display mb-10">Selected Work</h2><div className="grid md:grid-cols-3 gap-6">{data.map((d)=><WorkCardGL key={d} title={d}/>)}</div></section>}
