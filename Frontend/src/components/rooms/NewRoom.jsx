import { useContext, useRef } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';
import BackButton from '../BackButton.jsx';

export default function NewRoom() {
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

  return (
    <>
      <Modal ref={modal} buttonCaption="OK">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">Please enter all fields.</p>
      </Modal>
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-stone-700">Create a New Room</h1>
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
              className="px-4 py-2 rounded-md bg-stone-800 text-stone-100 hover:bg-stone-700"
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
