import React, { useState } from 'react';
import { SESSIONS, BATCHES, SUBJECTS, LABS, FACULTY, TIME_SLOTS, DAYS } from '../data/placeholders';

export default function Schedule() {
  const [sessions, setSessions] = useState(SESSIONS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ batchId: '', subjectId: '', labId: '', facultyId: '', day: 'Monday', slot: TIME_SLOTS[0] });

  const batchMap = Object.fromEntries(BATCHES.map(b => [b.id, b]));
  const subjectMap = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
  const labMap = Object.fromEntries(LABS.map(l => [l.id, l]));
  const facMap = Object.fromEntries(FACULTY.map(f => [f.id, f]));

  const detectClash = (f, excludeId = null) =>
    sessions.filter(s => s.id !== excludeId && ((s.labId === f.labId && s.day === f.day && s.slot === f.slot) ||
      (s.batchId === f.batchId && s.day === f.day && s.slot === f.slot)));

  const addSession = () => {
    if (!form.batchId || !form.subjectId || !form.labId || !form.facultyId) return alert('Fill all fields');
    const clashes = detectClash(form);
    if (clashes.length > 0) {
      alert('⚠ Clash detected! This time slot or lab is already occupied.');
      return;
    }
    const batch = batchMap[form.batchId];
    const lab = labMap[form.labId];
    if (batch && lab && batch.strength > lab.functionalPCs) {
      if (!window.confirm(`⚠ Batch strength (${batch.strength}) exceeds functional PCs (${lab.functionalPCs}). Proceed anyway?`)) return;
    }
    setSessions(prev => [...prev, { ...form, id: 'SES' + Date.now(), status: 'confirmed' }]);
    setShowAdd(false);
  };

  const remove = id => setSessions(prev => prev.filter(s => s.id !== id));

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Session Planning</div>
          <h1 className="page-title">Schedule</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(s => !s)}>
          {showAdd ? '✕ Cancel' : '＋ New Session'}
        </button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="section-title">New Lab Session</div>
          <div className="grid-3" style={{ gap: 14, marginBottom: 14 }}>
            <div>
              <label style={styles.label}>Batch</label>
              <select value={form.batchId} onChange={e => setForm(p => ({ ...p, batchId: e.target.value }))}>
                <option value="">Select batch</option>
                {BATCHES.map(b => <option key={b.id} value={b.id}>{b.name} ({b.division})</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Subject</label>
              <select value={form.subjectId} onChange={e => setForm(p => ({ ...p, subjectId: e.target.value }))}>
                <option value="">Select subject</option>
                {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.code} — {s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Lab</label>
              <select value={form.labId} onChange={e => setForm(p => ({ ...p, labId: e.target.value }))}>
                <option value="">Select lab</option>
                {LABS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.functionalPCs} PCs)</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Faculty</label>
              <select value={form.facultyId} onChange={e => setForm(p => ({ ...p, facultyId: e.target.value }))}>
                <option value="">Select faculty</option>
                {FACULTY.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Day</label>
              <select value={form.day} onChange={e => setForm(p => ({ ...p, day: e.target.value }))}>
                {DAYS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Time Slot</label>
              <select value={form.slot} onChange={e => setForm(p => ({ ...p, slot: e.target.value }))}>
                {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {form.batchId && form.labId && (() => {
            const b = batchMap[form.batchId]; const l = labMap[form.labId];
            if (b && l && b.strength > l.functionalPCs)
              return <div style={styles.warn}>⚠ Batch strength ({b.strength}) exceeds available PCs ({l.functionalPCs}) in this lab.</div>;
            return null;
          })()}
          <button className="btn btn-primary" onClick={addSession}>Schedule Session</button>
        </div>
      )}

      <div className="card">
        <div className="section-title">All Scheduled Sessions — {sessions.length} total</div>
        <table>
          <thead><tr><th>Batch</th><th>Subject</th><th>Lab</th><th>Faculty</th><th>Day</th><th>Time</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {sessions.map(s => {
              const hasClash = detectClash(s, s.id).length > 0;
              return (
                <tr key={s.id}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{batchMap[s.batchId]?.name ?? s.batchId}</td>
                  <td>{subjectMap[s.subjectId]?.code ?? s.subjectId}</td>
                  <td>{labMap[s.labId]?.name?.split(' —')[0] ?? s.labId}</td>
                  <td>{facMap[s.facultyId]?.name ?? s.facultyId}</td>
                  <td>{s.day}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{s.slot}</td>
                  <td>
                    {hasClash
                      ? <span className="badge badge-danger">CLASH</span>
                      : <span className={`badge badge-${s.status === 'confirmed' ? 'success' : 'warning'}`}>{s.status}</span>}
                  </td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => remove(s.id)}>✕</button></td>
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
  label: { display: 'block', fontSize: 11, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text3)', marginBottom: 6 },
  warn: { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: 'var(--warning)', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12 },
};
