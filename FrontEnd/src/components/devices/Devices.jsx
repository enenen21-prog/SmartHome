import { useContext, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import NewDevice from './NewDevice';
import ConfirmModal from '../ConfirmModal.jsx';
import DeviceItem from './DeviceItem.jsx';

const sectionTitleClasses = 'text-2xl font-semibold text-slate-100';
const sectionSubtitleClasses = 'text-sm text-slate-400';
const emptyTextClasses = 'text-slate-200 my-4';
const listClasses =
  'rounded-2xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(15,23,42,0.25)] divide-y divide-white/10';

export default function Devices({ role }) {
  const isAdmin = role === 'admin';
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
        <h2 className={sectionTitleClasses}>Devices</h2>
        <p className={sectionSubtitleClasses}>Devices in this room.</p>
      </div>
      {isAdmin ? <NewDevice /> : null}
      {roomDevices.length === 0 && (
        <p className={emptyTextClasses}>
          This room does not have any devices yet
        </p>
      )}
      {roomDevices.length > 0 && (
        <ul className={listClasses}>
          {roomDevices.map((device) => (
            <DeviceItem
              key={device.id}
              device={device}
              isAdmin={isAdmin}
              onDelete={handleDeleteClick}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

