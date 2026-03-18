import { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';
import { getDevicesByRoom } from '../../api/devices.api.js';
import RoomSelect from './RoomSelect.jsx';
import DeviceSelect from './DeviceSelect.jsx';
import Button from '../Button.jsx';

export default function Dashboard({
  onViewData,
  selectedRoomId,
  selectedDeviceId,
  onRoomChange,
  onDeviceChange,
}) {
  const { rooms, isLoadingRooms } = useContext(LayoutContext);
  const [devices, setDevices] = useState([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(false);

  useEffect(() => {
    if (selectedRoomId || rooms.length === 0) return;
    onRoomChange(rooms[0].id);
  }, [rooms, selectedRoomId, onRoomChange]);

  useEffect(() => {
    async function loadDevices() {
      if (!selectedRoomId) {
        setDevices([]);
        onDeviceChange(null);
        return;
      }
      setIsLoadingDevices(true);
      try {
        const roomDevices = await getDevicesByRoom(selectedRoomId);
        setDevices(roomDevices);
        const nextId = roomDevices.length > 0 ? roomDevices[0].id : null;
        if (!roomDevices.some((d) => d.id === selectedDeviceId)) {
          onDeviceChange(nextId);
        }
      } finally {
        setIsLoadingDevices(false);
      }
    }
    loadDevices();
  }, [selectedRoomId, selectedDeviceId, onDeviceChange]);

  const deviceSelectDisabled = !selectedRoomId || isLoadingDevices;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-100">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 max-w-xl">
        <RoomSelect
          rooms={rooms}
          value={selectedRoomId}
          onChange={(e) => onRoomChange(Number(e.target.value) || null)}
          disabled={isLoadingRooms || rooms.length === 0}
        />
        <DeviceSelect
          devices={devices}
          value={selectedDeviceId}
          onChange={(e) => onDeviceChange(Number(e.target.value) || null)}
          disabled={deviceSelectDisabled}
        />
        <Button
          type="button"
          className="mt-2 w-fit"
          onClick={onViewData}
          disabled={!selectedDeviceId}
        >
          Measurements
        </Button>
      </div>
    </section>
  );
}
