import React, { useState } from 'react';
import { BATCHES } from '../data/placeholders';

export default function Batches() {
  const [batches, setBatches] = useState(BATCHES);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', division: '', year: 'SY', strength: '' });

  const addBatch = () => {
    if (!form.name) return;
    setBatches(prev => [...prev, { ...form, id: 'B' + (prev.length + 1), strength: +form.strength }]);
    setForm({ name: '', division: '', year: 'SY', strength: '' });
    setShowAdd(false);
  };

  const remove = id => setBatches(prev => prev.filter(b => b.id !== id));

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Academic Groups</div>
          <h1 className="page-title">Batches</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(s => !s)}>
          {showAdd ? '✕ Cancel' : '＋ Add Batch'}
        </button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="section-title">New Batch</div>
          <div className="grid-4" style={{ gap: 12, marginBottom: 14 }}>
            <div><label style={styles.label}>Batch Name</label><input placeholder="e.g. Batch A1" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div><label style={styles.label}>Division</label><input placeholder="e.g. CSE-A" value={form.division} onChange={e => setForm(p => ({ ...p, division: e.target.value }))} /></div>
            <div><label style={styles.label}>Year</label>
              <select value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))}>
                <option value="FY">FY</option><option value="SY">SY</option><option value="TY">TY</option><option value="BE">BE</option>
              </select>
            </div>
            <div><label style={styles.label}>Strength</label><input type="number" placeholder="e.g. 30" value={form.strength} onChange={e => setForm(p => ({ ...p, strength: e.target.value }))} /></div>
          </div>
          <button className="btn btn-primary" onClick={addBatch}>Add Batch</button>
        </div>
      )}

      <div className="card">
        <div className="section-title">All Batches — {batches.length} groups</div>
        <table>
          <thead><tr><th>Batch ID</th><th>Name</th><th>Division</th><th>Year</th><th>Strength</th><th>Actions</th></tr></thead>
          <tbody>
            {batches.map(b => (
              <tr key={b.id}>
                <td style={{ fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{b.id}</td>
                <td style={{ color: 'var(--text)', fontWeight: 600 }}>{b.name}</td>
                <td>{b.division}</td>
                <td><span className="badge badge-info">{b.year}</span></td>
                <td style={{ fontFamily: 'var(--mono)' }}>{b.strength}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => remove(b.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 32, maxWidth: 1200 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  label: { display: 'block', fontSize: 11, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text3)', marginBottom: 6 },
};
