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
      <div className="w-[35rem] space-y-4">
        <h2 className="text-2xl font-bold text-stone-700">
          Create a New Room
        </h2>
        <menu className="flex items-center justify-end gap-4">
          <li>
            <BackButton onClick={cancelAddRoom} />
          </li>
          <li>
            <button
              className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" maxLength={16} />
          <Input
            type="text"
            ref={description}
            label="Description"
            textarea
            maxLength={32}
          />
        </div>
      </div>
    </>
  );
}
