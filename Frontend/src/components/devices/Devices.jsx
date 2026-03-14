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
    <section className="space-y-4">
      <ConfirmModal
        ref={confirmRef}
        title="Delete Device"
        message="Are you sure you want to delete this device?"
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
      <h2 className="text-2xl font-bold text-stone-700">Devices</h2>
      <NewDevice />
      {roomDevices.length === 0 && (
        <p className="text-stone-800 my-4">
          This room does not have any devices yet
        </p>
      )}
      {roomDevices.length > 0 && (
        <ul className="rounded-lg bg-stone-100 border border-stone-200 shadow-sm">
          {roomDevices.map((device) => (
            <li
              key={device.id}
              className="flex justify-between px-3 py-3 border-b border-stone-200 last:border-b-0 transition-colors hover:bg-stone-200"
            >
              <span className="text-stone-800">
                <span className="font-semibold">{device.name}</span>
                <span className="mx-2 text-stone-400">·</span>
                <span className="text-sm text-stone-500">
                  {device.ipv4Address}
                </span>
              </span>
              <button
                className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
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
