import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const getCities   = ()     => axios.get(`${BASE}/api/cities`)
export const getForecast = (city) => axios.get(`${BASE}/api/forecast?city=${encodeURIComponent(city)}`)