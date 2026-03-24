import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import Button from './Button';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-slate-950/90 p-6 rounded-2xl bg-white/10 border border-white/10 text-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.6)]"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root'),
  );
});

export default Modal;
