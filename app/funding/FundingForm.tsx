'use client'

import { useState } from 'react'

type PathwayOption = {
  id: string
  label: string
}

const pathwayOptions: PathwayOption[] = [
  { id: 'EV Venture Studio', label: 'EV Venture Studio' },
  { id: 'Creators Fund', label: 'Creators Fund' },
  { id: 'Pitch Perfect', label: 'Pitch Perfect' },
  { id: 'Agripro Micro Funding', label: 'Agripro Micro Funding' },
]

export default function FundingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [stage, setStage] = useState('idea')
  const [goals, setGoals] = useState('')
  const [pathways, setPathways] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  const togglePathway = (id: string) => {
    setPathways(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  const onSubmit = async () => {
    if (!name || !email) {
      setStatus({ ok: false, message: 'Name and email are required.' })
      return
    }
    try {
      setSubmitting(true)
      setStatus(null)
      const res = await fetch('/api/funding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, stage, goals, pathways }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to send')
      }
      setStatus({ ok: true, message: 'Sent. We’ll review and route your application.' })
      setName('')
      setEmail('')
      setStage('idea')
      setGoals('')
      setPathways([])
    } catch (e: any) {
      setStatus({ ok: false, message: e.message || 'Something went wrong.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
      <div className="grid gap-1">
        <label htmlFor="name" className="text-sm">Your name</label>
        <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Founder" className="rounded-xl border-0 bg-white/90 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 focus:outline-none" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" className="rounded-xl border-0 bg-white/90 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 focus:outline-none" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="stage" className="text-sm">Stage</label>
        <select id="stage" name="stage" value={stage} onChange={(e) => setStage(e.target.value)} className="rounded-xl border-0 bg-white/90 px-4 py-3 text-neutral-900 focus:outline-none">
          <option value="idea">Idea</option>
          <option value="mvp">MVP</option>
          <option value="early-traction">Early traction</option>
          <option value="creator">Creator</option>
          <option value="agribusiness">Agribusiness</option>
        </select>
      </div>
      <div className="grid gap-1">
        <label htmlFor="goals" className="text-sm">Goals (next 90 days)</label>
        <textarea id="goals" name="goals" value={goals} onChange={(e) => setGoals(e.target.value)} rows={3} placeholder="Ship MVP, test pricing, 25 beta users…" className="rounded-xl border-0 bg-white/90 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 focus:outline-none" />
      </div>
      <div className="grid gap-1">
        <span className="text-sm">Interested pathways</span>
        <div className="grid grid-cols-2 gap-2 text-neutral-900">
          {pathwayOptions.map((p) => (
            <label key={p.id} className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2">
              <input type="checkbox" checked={pathways.includes(p.id)} onChange={() => togglePathway(p.id)} className="accent-red-600" />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" disabled={submitting} className="mt-2 inline-flex items-center justify-center rounded-2xl bg-black/90 px-5 py-3 text-white shadow-sm transition hover:bg-black disabled:opacity-60">
        {submitting ? 'Sending…' : 'Send & match me'}
      </button>
      {status && (
        <p className={`text-xs ${status.ok ? 'text-white/90' : 'text-yellow-200'}`}>{status.message}</p>
      )}
    </form>
  )
}


