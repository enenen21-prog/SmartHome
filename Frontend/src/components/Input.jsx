import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    'w-full p-2 border border-stone-300 rounded-md bg-white text-stone-800 focus:outline-none focus:border-stone-600';
  return (
    <p className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-stone-600">
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
