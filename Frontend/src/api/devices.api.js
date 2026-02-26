const BASE_URL = 'http://localhost:5201';


export async function fetchDevicesByRoom(roomId) {
  const res = await fetch(`${BASE_URL}/rooms/${roomId}/devices`);

  if (!res.ok) {
    throw new Error('Failed to fetch devices');
  }

  return res.json();
}


export async function createDevice({ roomId, text }) {
  const res = await fetch(`${BASE_URL}/rooms/${roomId}/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error('Failed to create device');
  }

  return res.json();
}


export async function deleteDevice(deviceId) {
  const res = await fetch(`${BASE_URL}/devices/${deviceId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete device');
  }
}