export default function RangeSelect({ value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-300">Sample Range</span>
      <select
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
        value={value}
        onChange={onChange}
      >
        {options.map(({ id, label }) => (
          <option key={id} value={id} className="bg-white text-slate-900">
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
