import { useEffect, useState } from 'react';
import axios from 'axios';

const base = import.meta.env.VITE_BASE_URL;
export function useDiscovery(path) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: '' });
    axios.get(base + path, { signal: controller.signal }).then(({ data }) => {
      if (!data.success) throw new Error('Could not load this page');
      setState({ data, loading: false, error: '' });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ data: null, loading: false, error: error.response?.data?.message || 'We couldn’t load this content. Please try again.' });
    });
    return () => controller.abort();
  }, [path, attempt]);
  return { ...state, retry: () => setAttempt(n => n + 1) };
}
export async function enrollFree(courseId, token) {
  const { data } = await axios.post(base + 'course/enrollFree', { courseId }, { headers: { Authorization: `Bearer ${token}` } });
  return data;
}
