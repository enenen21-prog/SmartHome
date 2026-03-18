export default function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) {
  return (
    <label className="flex flex-col gap-2">
      {label ? (
        <span className="text-sm font-semibold text-slate-300">{label}</span>
      ) : null}
      <select
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder ? (
          <option value="" className="bg-white text-slate-900">
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white text-slate-900"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
