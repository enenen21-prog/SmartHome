export default function BackButton({ onClick, className = '', children }) {
  const label = children ?? 'Back';
  const baseClasses =
    'px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300';

  return (
    <button className={`${baseClasses} ${className}`.trim()} onClick={onClick}>
      {label}
    </button>
  );
}
