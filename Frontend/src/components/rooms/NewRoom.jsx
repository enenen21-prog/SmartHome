import { useContext, useRef } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';

export default function NewRoom() {
  const modal = useRef();
  const title = useRef();
  const description = useRef();

  const { addRoom, cancelAddRoom } = useContext(LayoutContext);

  async  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '') {
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
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={cancelAddRoom}
            >
              Cancel
            </button>
          </li>
          <li>
            <Button onClick={handleSave}>Save</Button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input type="text" ref={description} label="Description" textarea />
        </div>
      </div>
    </>
  );
}
