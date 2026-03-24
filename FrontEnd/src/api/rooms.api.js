import axios from 'axios';

const BASE_URL = 'http://localhost:5201/api/rooms';

export async function fetchRooms() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function createRoom(roomData) {
  const res = await axios.post(BASE_URL, roomData);
  return res.data;
}

export async function deleteRoomApi(id) {
  await axios.delete(`${BASE_URL}/${id}`);
}
