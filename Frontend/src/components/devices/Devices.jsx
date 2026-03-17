import { useContext, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import NewDevice from './NewDevice';
import ConfirmModal from '../ConfirmModal.jsx';

export default function Devices({ role }) {
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
        <h2 className="text-2xl font-semibold text-slate-100">Devices</h2>
        <p className="text-sm text-slate-400">Devices in this room.</p>
      </div>
      {role === 'admin' ? <NewDevice /> : null}
      {roomDevices.length === 0 && (
        <p className="text-slate-200 my-4">
          This room does not have any devices yet
        </p>
      )}
      {roomDevices.length > 0 && (
        <ul className="rounded-2xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(15,23,42,0.25)] divide-y divide-white/10">
          {roomDevices.map((device) => (
            <li
              key={device.id}
              className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/5"
            >
              <div className="flex flex-col">
                <span className="text-slate-100 font-medium">
                  {device.name}
                </span>
                <span className="text-sm text-slate-400">
                  {device.ipv4Address}
                </span>
              </div>
              {role === 'admin' ? (
                <button
                  className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
                  onClick={() => handleDeleteClick(device.id)}
                >
                  Delete
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

