import { useContext, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';
import Button from '../Button.jsx';

export default function NewDevice() {
  const { addDevice, selectedRoomId } = useContext(LayoutContext);
  const [deviceName, setDeviceName] = useState('');
  const [deviceIp, setDeviceIp] = useState('');

  const trimmedName = deviceName.trim();
  const trimmedIp = deviceIp.trim();
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  const isValidIpv4 = ipv4Regex.test(trimmedIp);
  const shouldShowIpRequired = selectedRoomId && trimmedIp === '';
  const shouldShowIpError = selectedRoomId && trimmedIp !== '' && !isValidIpv4;
  const isDisabled = !selectedRoomId || trimmedName === '' || !isValidIpv4;

  async function handleAddDevice() {
    if (isDisabled) return;

    try {
      await addDevice(trimmedName, trimmedIp);
      setDeviceName('');
      setDeviceIp('');
    } catch (err) {
      console.error('Failed to add device:', err);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <div className="rounded-lg border border-stone-200 bg-gradient-to-b from-stone-100 to-stone-50 p-3 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-stone-600">
              Device name
              <input
                type="text"
                placeholder="Kitchen Light"
                className="mt-1 w-full rounded-md bg-stone-200 px-3 py-2 text-sm text-stone-900 outline-none ring-1 ring-transparent transition focus:ring-stone-400"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                maxLength={32}
              />
            </label>
            <label className="text-xs font-semibold text-stone-600">
              IPv4 address
              <input
                type="text"
                placeholder="192.168.1.10"
                className="mt-1 w-full rounded-md bg-stone-200 px-3 py-2 text-sm text-stone-900 outline-none ring-1 ring-transparent transition focus:ring-stone-400"
                value={deviceIp}
                onChange={(e) => setDeviceIp(e.target.value)}
                maxLength={15}
                required
              />
            </label>
          </div>
        </div>

        {!selectedRoomId && (
          <span className="text-xs text-stone-500 mt-1">
            Select a room to add devices
          </span>
        )}
        {shouldShowIpRequired && (
          <span className="text-xs text-red-600 mt-1">
            IPv4 address is required
          </span>
        )}
        {shouldShowIpError && (
          <span className="text-xs text-red-600 mt-1">
            Enter a valid IPv4 address
          </span>
        )}
      </div>

      <Button
        type="button"
        onClick={handleAddDevice}
        disabled={isDisabled}
      >
        + Add Device
      </Button>
    </div>
  );
}
