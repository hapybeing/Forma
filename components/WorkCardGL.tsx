'use client'
export default function WorkCardGL({title}:{title:string}){return <div className="rounded-2xl p-8" style={{background:'var(--card-bg)',border:'1px solid var(--border)',minHeight:260}}><div className="text-label mb-6" style={{color:'var(--muted)'}}>CASE STUDY</div><h3 className="text-h2 font-display">{title}</h3></div>}
