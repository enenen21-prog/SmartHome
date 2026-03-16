import { useState } from 'react';

const TIME_RANGES = [
  { id: 'last-hour', label: 'Last hour' },
  { id: 'last-24h', label: 'Last 24 hours' },
  { id: 'last-30-days', label: 'Last 30 days' },
];

export default function ViewData({ onBack }) {
  const [range, setRange] = useState(TIME_RANGES[0].id);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-stone-700">Measurements</h1>
        <button
          type="button"
          className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 hover:bg-stone-300"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-xl">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-stone-600">
            Sample Range
          </span>
          <select
            className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-800"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            {TIME_RANGES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
