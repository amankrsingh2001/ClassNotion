import axios from 'axios';
const base = import.meta.env.VITE_BASE_URL;
export async function studioRequest(path, token, method = 'GET', body, signal) {
  try {
    const { data } = await axios({ url: base + path, method, data: body, signal, headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) { if (signal?.aborted) throw error; throw new Error(error.response?.data?.message || 'This request could not be completed. Please try again.'); }
}
