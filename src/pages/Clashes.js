import React from 'react';
import { SESSIONS, BATCHES, LABS } from '../data/placeholders';

export default function Clashes() {
  const batchMap = Object.fromEntries(BATCHES.map(b => [b.id, b]));
  const labMap = Object.fromEntries(LABS.map(l => [l.id, l]));

  // Detect lab clashes (same lab, same day, same slot)
  const labClashes = [];
  for (let i = 0; i < SESSIONS.length; i++) {
    for (let j = i + 1; j < SESSIONS.length; j++) {
      const a = SESSIONS[i], b = SESSIONS[j];
      if (a.labId === b.labId && a.day === b.day && a.slot === b.slot) {
        labClashes.push({ type: 'Lab Conflict', sessionA: a, sessionB: b, detail: `${a.labId} is double-booked on ${a.day} at ${a.slot}` });
      }
    }
  }

  // Detect batch clashes (same batch, same day, same slot)
  const batchClashes = [];
  for (let i = 0; i < SESSIONS.length; i++) {
    for (let j = i + 1; j < SESSIONS.length; j++) {
      const a = SESSIONS[i], b = SESSIONS[j];
      if (a.batchId === b.batchId && a.day === b.day && a.slot === b.slot) {
        batchClashes.push({ type: 'Batch Conflict', sessionA: a, sessionB: b, detail: `${batchMap[a.batchId]?.name} has two sessions on ${a.day} at ${a.slot}` });
      }
    }
  }

  // Detect capacity issues
  const capacityIssues = SESSIONS.filter(s => {
    const batch = batchMap[s.batchId];
    const lab = labMap[s.labId];
    return batch && lab && batch.strength > lab.functionalPCs;
  });

  const totalIssues = labClashes.length + batchClashes.length + capacityIssues.length;

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Validation</div>
          <h1 className="page-title">Clash Detection</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {totalIssues === 0
            ? <span className="badge badge-success">✓ No Issues Found</span>
            : <span className="badge badge-danger">⚠ {totalIssues} Issue{totalIssues > 1 ? 's' : ''} Found</span>}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {[
          { label: 'Lab Conflicts', count: labClashes.length, icon: '🏛', col: labClashes.length > 0 ? 'var(--danger)' : 'var(--success)' },
          { label: 'Batch Conflicts', count: batchClashes.length, icon: '👥', col: batchClashes.length > 0 ? 'var(--danger)' : 'var(--success)' },
          { label: 'Capacity Issues', count: capacityIssues.length, icon: '💻', col: capacityIssues.length > 0 ? 'var(--warning)' : 'var(--success)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ borderLeft: `3px solid ${s.col}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="section-title" style={{ margin: 0 }}>{s.label}</div>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div className="stat-number" style={{ color: s.col }}>{s.count}</div>
          </div>
        ))}
      </div>

      {/* Lab Clashes */}
      {labClashes.length > 0 && (
        <div className="card" style={{ marginBottom: 16, borderLeft: '3px solid var(--danger)' }}>
          <div className="section-title">Lab Conflicts</div>
          {labClashes.map((c, i) => <ClashRow key={i} c={c} batchMap={batchMap} />)}
        </div>
      )}

      {/* Batch Clashes */}
      {batchClashes.length > 0 && (
        <div className="card" style={{ marginBottom: 16, borderLeft: '3px solid var(--danger)' }}>
          <div className="section-title">Batch Conflicts</div>
          {batchClashes.map((c, i) => <ClashRow key={i} c={c} batchMap={batchMap} />)}
        </div>
      )}

      {/* Capacity Issues */}
      {capacityIssues.length > 0 && (
        <div className="card" style={{ marginBottom: 16, borderLeft: '3px solid var(--warning)' }}>
          <div className="section-title">Capacity Issues</div>
          {capacityIssues.map(s => {
            const batch = batchMap[s.batchId];
            const lab = labMap[s.labId];
            return (
              <div key={s.id} style={styles.clashRow}>
                <span style={{ fontSize: 18 }}>⚠️</span>
                <div>
                  <div style={{ color: 'var(--warning)', fontWeight: 600, fontSize: 14 }}>
                    {batch?.name} → {lab?.name}
                  </div>
                  <div style={{ color: 'var(--text3)', fontSize: 12, marginTop: 2 }}>
                    Batch strength ({batch?.strength}) exceeds functional PCs ({lab?.functionalPCs}) — {s.day} at {s.slot}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalIssues === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--success)' }}>All Clear!</div>
          <div style={{ color: 'var(--text3)', marginTop: 8, fontSize: 14 }}>No conflicts or capacity issues detected in the current schedule.</div>
        </div>
      )}
    </div>
  );
}

function ClashRow({ c, batchMap }) {
  return (
    <div style={styles.clashRow}>
      <span style={{ fontSize: 18 }}>🚨</span>
      <div>
        <div style={{ color: 'var(--danger)', fontWeight: 600, fontSize: 14 }}>{c.detail}</div>
        <div style={{ color: 'var(--text3)', fontSize: 12, marginTop: 2 }}>
          Session 1: {batchMap[c.sessionA.batchId]?.name} · {c.sessionA.subjectId} · {c.sessionA.labId}
          {' — '}
          Session 2: {batchMap[c.sessionB.batchId]?.name} · {c.sessionB.subjectId} · {c.sessionB.labId}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 32, maxWidth: 1200 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  clashRow: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)' },
};
