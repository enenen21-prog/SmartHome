import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    'w-full p-2.5 border border-white/10 rounded-xl bg-white/5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30';
  return (
    <p className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-slate-300">
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props}/>
      )}
    </p>
  );
})

export default Input;
