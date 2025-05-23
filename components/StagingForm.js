import { useState } from 'react';

export default function StagingForm({ file, onApprove }) {
  const [content, setContent] = useState(file.content);
  const [metadata, setMetadata] = useState(file.metadata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFile = { ...file, content, metadata, content: content.replace(/# Reviewed: false/i, '# Reviewed: true') };
    await onApprove(updatedFile);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>{file.metadata.title}</h3>
      <label>
        Tags (comma-separated):
        <input
          type="text"
          value={metadata.tags.join(',')}
          onChange={(e) => setMetadata({ ...metadata, tags: e.target.value.split(',').map(t => t.trim()) })}
          style={{ width: '100%', margin: '5px 0' }}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={metadata.category}
          onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
          style={{ width: '100%', margin: '5px 0' }}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', height: '200px', margin: '5px 0' }}
        />
      </label>
      <button type="submit" style={{ padding: '10px 20px' }}>Approve</button>
    </form>
  );
}