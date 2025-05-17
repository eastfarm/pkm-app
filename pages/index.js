import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');

  const handleQuery = async () => {
    try {
      const response = await axios.post('https://pkm-indexer.railway.app/search', { query });
      setResults(response.data.response);
    } catch (error) {
      setResults('Error: Could not fetch results');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>PKM Query</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your KB..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleQuery} style={{ padding: '10px 20px' }}>Search</button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{results}</div>
    </div>
  );
}