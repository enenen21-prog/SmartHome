import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ConfirmModal = forwardRef(function ConfirmModal(
  {
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
  },
  ref,
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  function handleConfirm() {
    onConfirm?.();
    dialog.current.close();
  }

  function handleCancel() {
    dialog.current.close();
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-slate-950/90 p-6 rounded-2xl bg-white/10 border border-white/10 text-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.6)]"
    >
      <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      <p className="text-slate-300 mt-2">{message}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
          onClick={handleCancel}
        >
          {cancelLabel}
        </button>
        <button
          className="px-3 py-1 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white shadow-[0_10px_25px_rgba(79,70,229,0.35)]"
          onClick={handleConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>,
    document.getElementById('modal-root'),
  );
});

export default ConfirmModal;
