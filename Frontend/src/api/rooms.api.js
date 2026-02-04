const BASE_URL = 'http://localhost:3000';

export async function fetchRooms() {
  const res = await fetch(`${BASE_URL}/rooms`);
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}

export async function createRoom(roomData) {

  const res = await fetch(`${BASE_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  });
  if (!res.ok) throw new Error('Failed to create room');
  return res.json();
}













export async function deleteRoom(id) {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete room');
}
