import { useContext, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import NewDevice from './NewDevice';
import ConfirmModal from '../ConfirmModal.jsx';

export default function Devices() {
  const { devices, selectedRoomId, deleteDevice } = useContext(LayoutContext);
  const roomDevices = devices.filter((d) => d.roomId === selectedRoomId);
  const confirmRef = useRef();
  const [pendingDeviceId, setPendingDeviceId] = useState(null);

  function handleDeleteClick(deviceId) {
    setPendingDeviceId(deviceId);
    confirmRef.current.open();
  }

  function handleConfirmDelete() {
    if (!pendingDeviceId) return;
    deleteDevice(pendingDeviceId);
    setPendingDeviceId(null);
  }

  return (
    <section className="space-y-6">
      <ConfirmModal
        ref={confirmRef}
        title="Delete Device"
        message="Are you sure you want to delete this device?"
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
      <div>
        <h2 className="text-2xl font-bold text-stone-700">Devices</h2>
        <p className="text-sm text-stone-500">Devices in this room.</p>
      </div>
      <NewDevice />
      {roomDevices.length === 0 && (
        <p className="text-stone-800 my-4">
          This room does not have any devices yet
        </p>
      )}
      {roomDevices.length > 0 && (
        <ul className="rounded-xl bg-white border border-stone-200 shadow-sm divide-y divide-stone-200">
          {roomDevices.map((device) => (
            <li
              key={device.id}
              className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-stone-50"
            >
              <div className="flex flex-col">
                <span className="text-stone-800 font-medium">
                  {device.name}
                </span>
                <span className="text-sm text-stone-500">
                  {device.ipv4Address}
                </span>
              </div>
              <button
                className="px-3 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-800 transition hover:bg-stone-200"
                onClick={() => handleDeleteClick(device.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

