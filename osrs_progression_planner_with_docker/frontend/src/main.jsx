
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchPlayer() {
    setLoading(true);
    setError('');
    try {
      const api = '/api/player/' + encodeURIComponent(username);
      const res = await fetch(api);
      if (!res.ok) throw new Error('Player fetch failed');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>OSRS Progression Planner</h1>
      <p>Enter a username to fetch Wise Old Man data (via backend proxy).</p>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="OSRS username" />
      <button onClick={fetchPlayer} disabled={!username || loading} style={{ marginLeft: 8 }}>Fetch</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}
      {data && (
        <pre style={{ background:'#111', color:'#0f0', padding: 12, maxWidth: '100%', overflowX: 'auto' }}>
{JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
