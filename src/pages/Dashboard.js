import React from 'react';
import { LABS, BATCHES, SESSIONS, NOTIFICATIONS } from '../data/placeholders';

export default function Dashboard() {
  const totalPCs = LABS.reduce((a, l) => a + l.totalPCs, 0);
  const functionalPCs = LABS.reduce((a, l) => a + l.functionalPCs, 0);
  const utilization = Math.round((functionalPCs / totalPCs) * 100);

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Overview</div>
          <h1 className="page-title">Dashboard</h1>
        </div>
        <div style={{ color: 'var(--text3)', fontSize: 13, fontFamily: 'var(--mono)', textAlign: 'right' }}>
          {today}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Labs', value: LABS.length, color: 'var(--accent)', icon: '🏛' },
          { label: 'Functional PCs', value: `${functionalPCs}/${totalPCs}`, color: 'var(--success)', icon: '🖥' },
          { label: 'Active Batches', value: BATCHES.length, color: 'var(--accent3)', icon: '👥' },
          { label: 'Utilization', value: `${utilization}%`, color: utilization > 85 ? 'var(--warning)' : 'var(--success)', icon: '📊' },
        ].map(s => (
          <div key={s.label} className="card animate-in" style={{ borderLeft: `3px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div className="section-title" style={{ margin: 0 }}>{s.label}</div>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div className="stat-number" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Lab Status */}
        <div className="card">
          <div className="section-title">Lab Status</div>
          {LABS.map(lab => {
            const pct = Math.round((lab.functionalPCs / lab.totalPCs) * 100);
            const col = pct === 100 ? 'var(--success)' : pct >= 80 ? 'var(--accent)' : 'var(--warning)';
            return (
              <div key={lab.id} style={styles.labRow}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{lab.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{lab.location}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, color: col, fontFamily: 'var(--mono)', fontWeight: 700 }}>{lab.functionalPCs}/{lab.totalPCs}</div>
                  <div style={styles.bar}>
                    <div style={{ ...styles.barFill, width: `${pct}%`, background: col }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="section-title">Notifications</div>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} style={styles.notif}>
              <span style={{ fontSize: 18 }}>{n.type === 'warning' ? '⚠️' : n.type === 'success' ? '✅' : 'ℹ️'}</span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{n.message}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4, fontFamily: 'var(--mono)' }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="card">
        <div className="section-title">Upcoming Sessions (Placeholder)</div>
        <table>
          <thead>
            <tr>
              <th>Batch</th><th>Subject</th><th>Lab</th><th>Day</th><th>Time</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {SESSIONS.slice(0, 5).map(s => (
              <tr key={s.id}>
                <td style={{ color: 'var(--text)' }}>{BATCHES.find(b => b.id === s.batchId)?.name ?? s.batchId}</td>
                <td>{s.subjectId}</td>
                <td>{s.labId}</td>
                <td>{s.day}</td>
                <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{s.slot}</td>
                <td>
                  <span className={`badge badge-${s.status === 'confirmed' ? 'success' : 'warning'}`}>
                    {s.status}
                  </span>
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
  page: { padding: '32px', maxWidth: 1200 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  labRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' },
  bar: { width: 100, height: 4, background: 'var(--border)', borderRadius: 2, marginTop: 6, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 2, transition: 'width 0.5s ease' },
  notif: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)' },
};
