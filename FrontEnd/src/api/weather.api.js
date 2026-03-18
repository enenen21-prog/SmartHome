import axios from 'axios';

const BASE_URL = 'http://localhost:5201/api/weather';

export async function fetchCurrentWeather() {
  const res = await axios.get(`${BASE_URL}/current`);
  return res.data;
}
