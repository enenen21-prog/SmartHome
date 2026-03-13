const API_BASE = "http://localhost:5201/api/devices";


export async function getDevicesByRoom(roomId) {
  try {
    const response = await fetch(`${API_BASE}/room/${roomId}`);
    if (!response.ok) {
      throw new Error("Failed to get devices");
    }
    const data = await response.json();
    return data; // array of devices
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
}

export async function createDevice(deviceData) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deviceData),
  });
  if (!res.ok) throw new Error("Failed to create device");
  return res.json();
}

export async function deleteDeviceApi(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete device");
}
