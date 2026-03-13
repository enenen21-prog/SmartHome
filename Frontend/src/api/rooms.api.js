const BASE_URL = 'http://localhost:5201/api/rooms';

export async function fetchRooms() {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}

export async function createRoom(roomData) {

  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  });
  if (!res.ok) throw new Error('Failed to create room');
  return res.json();
}

export async function deleteRoomApi(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete room');
}
