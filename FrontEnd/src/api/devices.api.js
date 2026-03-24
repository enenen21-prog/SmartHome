import axios from 'axios';

const API_BASE = "http://localhost:5201/api/devices";

export async function getDevicesByRoom(roomId) {
  try {
    const res = await axios.get(`${API_BASE}/room/${roomId}`);
    return res.data; // array of devices
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
}

export async function createDevice(deviceData) {
  const res = await axios.post(API_BASE, deviceData);
  return res.data;
}

export async function deleteDeviceApi(id) {
  await axios.delete(`${API_BASE}/${id}`);
}
