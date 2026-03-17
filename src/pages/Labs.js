import React, { useState } from 'react';
import { LABS } from '../data/placeholders';

export default function Labs() {
  const [labs, setLabs] = useState(LABS);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = lab => { setEditing(lab.id); setForm({ ...lab }); };
  const cancelEdit = () => { setEditing(null); setForm({}); };
  const saveEdit = () => {
    setLabs(prev => prev.map(l => l.id === editing ? { ...form, functionalPCs: +form.functionalPCs, totalPCs: +form.totalPCs } : l));
    setEditing(null);
  };

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Infrastructure</div>
          <h1 className="page-title">Labs &amp; PCs</h1>
        </div>
        <button className="btn btn-primary">＋ Add Lab</button>
      </div>

      <div className="grid-3" style={{ marginBottom: 28 }}>
        {labs.map(lab => {
          const pct = Math.round((lab.functionalPCs / lab.totalPCs) * 100);
          const faulty = lab.totalPCs - lab.functionalPCs;
          const col = pct === 100 ? 'var(--success)' : pct >= 80 ? 'var(--accent)' : 'var(--warning)';
          const isEditing = editing === lab.id;

          return (
            <div key={lab.id} className="card">
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="section-title">Editing {lab.id}</div>
                  <input placeholder="Lab Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  <input placeholder="Location" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
                  <div className="grid-2">
                    <input type="number" placeholder="Total PCs" value={form.totalPCs} onChange={e => setForm(p => ({ ...p, totalPCs: e.target.value }))} />
                    <input type="number" placeholder="Functional PCs" value={form.functionalPCs} onChange={e => setForm(p => ({ ...p, functionalPCs: e.target.value }))} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button className="btn btn-primary btn-sm" onClick={saveEdit}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 3 }}>{lab.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{lab.id} · {lab.location}</div>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => startEdit(lab)}>Edit</button>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>PC Availability</span>
                      <span style={{ fontSize: 13, fontFamily: 'var(--mono)', color: col, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={styles.bar}><div style={{ ...styles.fill, width: `${pct}%`, background: col }} /></div>
                  </div>

                  <div className="grid-3" style={{ gap: 8 }}>
                    {[
                      { label: 'Total', value: lab.totalPCs, c: 'var(--text2)' },
                      { label: 'Functional', value: lab.functionalPCs, c: 'var(--success)' },
                      { label: 'Faulty', value: faulty, c: faulty > 0 ? 'var(--warning)' : 'var(--text3)' },
                    ].map(s => (
                      <div key={s.label} style={styles.miniStat}>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--mono)', color: s.c }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <span className={`badge ${pct === 100 ? 'badge-success' : pct >= 80 ? 'badge-info' : 'badge-warning'}`}>
                      {pct === 100 ? 'Fully Operational' : pct >= 80 ? 'Mostly Available' : 'Reduced Capacity'}
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* PC Summary Table */}
      <div className="card">
        <div className="section-title">Summary Table</div>
        <table>
          <thead><tr><th>Lab ID</th><th>Name</th><th>Location</th><th>Total PCs</th><th>Functional</th><th>Faulty</th><th>Status</th></tr></thead>
          <tbody>
            {labs.map(lab => {
              const faulty = lab.totalPCs - lab.functionalPCs;
              const pct = Math.round((lab.functionalPCs / lab.totalPCs) * 100);
              return (
                <tr key={lab.id}>
                  <td style={{ fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{lab.id}</td>
                  <td style={{ color: 'var(--text)' }}>{lab.name}</td>
                  <td>{lab.location}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{lab.totalPCs}</td>
                  <td style={{ color: 'var(--success)', fontFamily: 'var(--mono)' }}>{lab.functionalPCs}</td>
                  <td style={{ color: faulty > 0 ? 'var(--warning)' : 'var(--text3)', fontFamily: 'var(--mono)' }}>{faulty}</td>
                  <td><span className={`badge ${pct===100?'badge-success':pct>=80?'badge-info':'badge-warning'}`}>{pct}%</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 32, maxWidth: 1200 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  bar: { height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3, transition: 'width 0.5s' },
  miniStat: { textAlign: 'center', padding: '8px 4px', background: 'var(--bg2)', borderRadius: 8 },
};
