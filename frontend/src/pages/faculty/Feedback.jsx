import { useState } from 'react'
import { Star } from 'lucide-react'
import { facultyFeedback } from '../../services/mockApi'

const categories = ['Innovation', 'Technical Implementation', 'Documentation', 'Presentation']

export default function Feedback() {
  const [selected, setSelected] = useState(categories[0])

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Feedback module</p>
            <h1 className="mt-3 text-4xl font-semibold text-ledger-950">Faculty review feedback</h1>
            <p className="mt-3 text-sm leading-7 text-ledger-600">Capture detailed project feedback, ratings, and improvement notes.</p>
          </div>
          <div className="rounded-[2rem] bg-ledger-50 px-5 py-4 text-sm text-ledger-600 ring-1 ring-ledger-100">
            100+ feedback entries available
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Feedback categories</p>
                <h2 className="mt-2 text-2xl font-semibold text-ledger-950">Review focus areas</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelected(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selected === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-ledger-50 text-ledger-700 hover:bg-ledger-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Selected category</p>
            <h2 className="mt-2 text-2xl font-semibold text-ledger-950">{selected}</h2>
            <p className="mt-3 text-sm text-ledger-600">Write structured feedback aligned to the selected review dimension.</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-ledger-50 p-4">
                <p className="text-sm font-semibold text-ledger-700">Rating guideline</p>
                <p className="mt-2 text-sm text-ledger-500">Use detailed notes and a score out of 5 for each feedback axis.</p>
              </div>
              <button className="rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Add feedback</button>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Recent feedback</p>
            <span className="rounded-full bg-ledger-50 px-3 py-1 text-xs font-semibold text-ledger-600">Top rated</span>
          </div>
          <div className="mt-6 space-y-4">
            {facultyFeedback.map((item) => (
              <div key={item.id} className="rounded-[1.75rem] border border-ledger-100 bg-ledger-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ledger-950">{item.comment}</p>
                    <p className="mt-1 text-xs text-ledger-500">{item.reviewer} — {item.category}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-ledger-700 shadow-sm">
                    <Star size={14} className="text-gold-500" /> {item.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
