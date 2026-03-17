import axios from 'axios';

const API_BASE = 'http://localhost:5201/api/users';

export async function login(email, password) {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data;
}
