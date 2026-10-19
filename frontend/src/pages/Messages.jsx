import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FiMessageCircle, FiSend, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { studioRequest } from '../services/studio';
import '../components/studio/educator.css';
export default function Messages() {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const [search] = useSearchParams();
  const [threads, setThreads] = useState([]);
  const [active, setActive] = useState('');
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [threadLoading, setThreadLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [threadError, setThreadError] = useState('');
  const [hasMore, setMore] = useState(false);
  const [olderLoading, setOlderLoading] = useState(false);
  const current = useRef('');
  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try { const data = await studioRequest('messages', token); setThreads(data.conversations); setActive(previous => data.conversations.some(item => item._id === previous) ? previous : data.conversations[0]?._id || ''); }
    catch (error) { setError(error.message); } finally { setLoading(false); }
  }, [token]);
  useEffect(() => { let active = true; const init = async () => {
    setLoading(true); setError('');
    try {
      let threadId;
      if (search.get('course')) { const data = await studioRequest('messages', token, 'POST', { courseId: search.get('course') }); threadId = data.thread._id; }
      const data = await studioRequest('messages', token);
      if (active) { setThreads(data.conversations); setActive(threadId || data.conversations[0]?._id || ''); }
    } catch (error) { if (active) setError(error.message); } finally { if (active) setLoading(false); }
  }; init(); return () => { active = false; }; }, [token, search]);
  useEffect(() => {
    current.current = active; setMessages([]); setThreadError(''); setBody(''); setMore(false);
    if (!active) return;
    const controller = new AbortController(); setThreadLoading(true);
    studioRequest(`messages/${active}`, token, 'GET', undefined, controller.signal).then(data => { setMessages(data.messages); setMore(data.hasMore); }).catch(error => { if (!controller.signal.aborted) setThreadError(error.message); }).finally(() => { if (!controller.signal.aborted) setThreadLoading(false); });
    return () => controller.abort();
  }, [active, token]);
  const loadMessages = async older => {
    const threadId = active;
    if (older) setOlderLoading(true); else setThreadLoading(true);
    try { const data = await studioRequest(`messages/${threadId}${older ? `?before=${messages[0]._id}` : ''}`, token); if (current.current === threadId) { setMessages(previous => older ? [...data.messages, ...previous] : data.messages); setMore(data.hasMore); setThreadError(''); } }
    catch (error) { if (current.current === threadId) setThreadError(error.message); } finally { setOlderLoading(false); setThreadLoading(false); }
  };
  const send = async event => { event.preventDefault(); if (!body.trim()) return; const threadId = active; setSending(true); try { const data = await studioRequest(`messages/${threadId}`, token, 'POST', { body }); if (current.current === threadId) { setMessages(previous => [...previous, data.message]); setBody(''); } } catch (error) { toast.error(error.message); } finally { setSending(false); } };
  const thread = threads.find(item => item._id === active);
  const person = thread && (thread.studentId === user._id ? thread.course.instructor : thread.student);
  return <div className="professional-page"><header><p className="eyebrow">COURSE CONVERSATIONS</p><h1>Keep the learning<br /><em>conversation going.</em></h1><p>Private messages between a course educator and an enrolled learner. Refresh to load new replies.</p></header>{loading ? <p role="status">Loading conversations…</p> : error ? <div role="alert">{error}<button className="btn btn-glass" onClick={refresh}>Try again</button></div> : !threads.length ? <div className="professional-status"><FiMessageCircle /><p>No conversations yet. Students can contact an educator from a course they’ve purchased or enrolled in.</p></div> : <div className="course-inbox"><nav aria-label="Conversations">{threads.map(item => { const person = item.studentId === user._id ? item.course.instructor : item.student; return <button key={item._id} className={active === item._id ? 'is-active' : ''} onClick={() => setActive(item._id)}><b>{person.firstName} {person.lastName}</b><span>{item.course.courseName}</span><small>{item.messages[0]?.body || 'Start a conversation'}</small></button>; })}</nav><section className="course-chat"><header><div><h2>{person?.firstName} {person?.lastName}</h2><p>{thread?.course.courseName}</p></div><button type="button" disabled={threadLoading || sending} onClick={() => loadMessages(false)} aria-label="Refresh messages"><FiRefreshCw /></button></header><div className="course-chat-messages" aria-live="polite">{threadLoading ? <p role="status">Loading messages…</p> : threadError ? <p role="alert">{threadError}</p> : <>{hasMore && <button className="course-chat-older" disabled={olderLoading} onClick={() => loadMessages(true)}>{olderLoading ? 'Loading…' : 'Load earlier messages'}</button>}{!messages.length && <p className="studio-input-hint">Say hello or ask a question about this course.</p>}{messages.map(message => <article className={message.senderId === user._id ? 'is-mine' : ''} key={message._id}><p>{message.body}</p><time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time></article>)}</>}</div><form onSubmit={send}><label className="sr-only" htmlFor="course-message">Message</label><textarea id="course-message" required maxLength={5000} rows={3} placeholder="Ask a question or share a helpful answer…" value={body} onChange={event => setBody(event.target.value)} disabled={sending || !!threadError || threadLoading} /><button className="btn btn-primary" disabled={sending || !body.trim() || !!threadError || threadLoading}>{sending ? 'Sending…' : 'Send'}<FiSend /></button></form></section></div>}</div>;
}
