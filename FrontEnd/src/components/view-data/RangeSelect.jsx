export default function RangeSelect({ value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-stone-600">Sample Range</span>
      <select
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-800"
        value={value}
        onChange={onChange}
      >
        {options.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
