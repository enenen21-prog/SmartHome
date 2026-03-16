import axios from 'axios';

const API_BASE = 'http://localhost:5201/api/samples';

export async function getSamples({ roomId, deviceId, range }) {
  const res = await axios.get(API_BASE, {
    params: { roomId, deviceId, range },
  });
  return res.data;
}
