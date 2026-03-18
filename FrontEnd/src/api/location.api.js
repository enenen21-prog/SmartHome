import axios from 'axios';

const BASE_URL = 'http://localhost:5201/api/location';

export async function fetchLocation() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function saveLocation({ city, country }) {
  const res = await axios.put(BASE_URL, { city, country });
  return res.data;
}
