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
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      <h2 className="text-xl font-bold text-stone-700">{title}</h2>
      <p className="text-stone-600 mt-2">{message}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
          onClick={handleCancel}
        >
          {cancelLabel}
        </button>
        <button
          className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
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
