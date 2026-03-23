import axios from 'axios';

const API_BASE = 'http://localhost:5201/api/users';

export async function login(email, password) {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data;
}

export async function createUser(user) {
  const res = await axios.post(API_BASE, user);
  return res.data;
}

export async function fetchUsers() {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function deleteUser(id) {
  await axios.delete(`${API_BASE}/${id}`);
}
