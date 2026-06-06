'use client'

import { useEffect, useState } from 'react'
import { Flame, Users } from 'lucide-react'

export default function StockUrgency() {
  const [viewers, setViewers] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Randomise a believable viewer count between 8 and 24
    const base = Math.floor(Math.random() * 16) + 8
    setViewers(base)

    // Slowly drift the number up and down to feel live
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.random() < 0.5 ? -1 : 1
        const next = prev + delta
        return Math.min(Math.max(next, 6), 30)
      })
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      {/* Low stock */}
      <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 flex-1">
        <Flame className="h-4 w-4 text-red-500 flex-shrink-0" />
        <p className="text-xs font-semibold text-red-700">
          Only <span className="text-red-600 font-bold">14 left</span> — selling fast
        </p>
      </div>

      {/* Live viewers */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex-1">
        <Users className="h-4 w-4 text-accent flex-shrink-0" />
        <p className="text-xs font-semibold text-blue-700">
          <span className="text-accent font-bold">{viewers} people</span> viewing right now
        </p>
      </div>
    </div>
  )
}
