export default function BackButton({ onClick, className = '', children }) {
  const label = children ?? 'Back';
  const baseClasses =
    'px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20';

  return (
    <button className={`${baseClasses} ${className}`.trim()} onClick={onClick}>
      {label}
    </button>
  );
}
