export default function Button({children, ...props}) {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white shadow-[0_10px_25px_rgba(79,70,229,0.35)] hover:translate-y-[-1px] transition disabled:cursor-not-allowed"
      {...props }
    >
      {children}
    </button>
  );
}
