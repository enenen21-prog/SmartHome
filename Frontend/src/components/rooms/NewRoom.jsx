import { useContext, useRef } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';
import BackButton from '../BackButton.jsx';

export default function NewRoom({ role }) {
  const isAdmin = role === 'admin';
  const modal = useRef();
  const title = useRef();
  const description = useRef();

  const { addRoom, cancelAddRoom } = useContext(LayoutContext);

  async function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;

    if (
      enteredTitle.trim() === '' ||
      enteredTitle.trim().length > 32 ||
      enteredDescription.trim().length > 64
    ) {
      modal.current.open();
      return;
    }

    await addRoom({
      title: enteredTitle,
      description: enteredDescription,
    });
  }

  if (!isAdmin) {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-slate-100">
          Create a New Room
        </h1>
        <p className="text-slate-300">
          You don't have permission to add rooms.
        </p>
        <BackButton onClick={cancelAddRoom} />
      </section>
    );
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="OK">
        <h2 className="text-xl font-semibold text-slate-100 my-4">
          Invalid input
        </h2>
        <p className="text-slate-300 mb-4">Please enter all fields.</p>
      </Modal>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-slate-100">
          Create a New Room
        </h1>
        <div className="grid grid-cols-1 gap-4 max-w-xl">
          <Input type="text" ref={title} label="Title" maxLength={16} />
          <Input
            type="text"
            ref={description}
            label="Description"
            textarea
            maxLength={32}
          />
          <div className="flex items-center gap-3">
            <BackButton onClick={cancelAddRoom} />
            <button
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-slate-100 hover:bg-white/20"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
