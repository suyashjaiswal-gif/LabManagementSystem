import React, { useState } from 'react';
import { SESSIONS, BATCHES, SUBJECTS, LABS, DAYS, TIME_SLOTS } from '../data/placeholders';

export default function Timetable() {
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterLab, setFilterLab] = useState('all');

  const filtered = SESSIONS.filter(s =>
    (filterBatch === 'all' || s.batchId === filterBatch) &&
    (filterLab   === 'all' || s.labId   === filterLab)
  );

  const cellKey = (day, slot) => `${day}|${slot}`;
  const sessionMap = {};
  filtered.forEach(s => {
    const k = cellKey(s.day, s.slot);
    if (!sessionMap[k]) sessionMap[k] = [];
    sessionMap[k].push(s);
  });

  const batchMap = Object.fromEntries(BATCHES.map(b => [b.id, b]));
  const subjectMap = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));

  const colours = ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444'];
  const batchColour = {};
  BATCHES.forEach((b, i) => { batchColour[b.id] = colours[i % colours.length]; });

  const printTimetable = () => window.print();

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Visual Grid</div>
          <h1 className="page-title">Timetable</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)} style={{ width: 'auto' }}>
            <option value="all">All Batches</option>
            {BATCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <select value={filterLab} onChange={e => setFilterLab(e.target.value)} style={{ width: 'auto' }}>
            <option value="all">All Labs</option>
            {LABS.map(l => <option key={l.id} value={l.id}>{l.id}</option>)}
          </select>
          <button className="btn btn-secondary" onClick={printTimetable}>🖨 Print</button>
        </div>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ width: 100, position: 'sticky', left: 0, background: 'var(--card)', zIndex: 1 }}>Day / Slot</th>
              {TIME_SLOTS.map(slot => <th key={slot} style={{ fontSize: 10 }}>{slot}</th>)}
            </tr>
          </thead>
          <tbody>
            {DAYS.map(day => (
              <tr key={day}>
                <td style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 12, position: 'sticky', left: 0, background: 'var(--card)', zIndex: 1, padding: '14px 16px' }}>
                  {day.slice(0, 3).toUpperCase()}
                </td>
                {TIME_SLOTS.map(slot => {
                  const entries = sessionMap[cellKey(day, slot)] || [];
                  return (
                    <td key={slot} style={{ padding: 4, verticalAlign: 'top', minWidth: 120 }}>
                      {entries.map(s => {
                        const batch = batchMap[s.batchId];
                        const subject = subjectMap[s.subjectId];
                        const col = batchColour[s.batchId] ?? 'var(--accent)';
                        return (
                          <div key={s.id} style={{ ...styles.cell, borderLeft: `3px solid ${col}`, background: `${col}18` }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: col, fontFamily: 'var(--mono)' }}>{batch?.name ?? s.batchId}</div>
                            <div style={{ fontSize: 10, color: 'var(--text2)', marginTop: 2 }}>{subject?.code ?? s.subjectId}</div>
                            <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 1 }}>{s.labId}</div>
                          </div>
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="section-title">Batch Legend</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {BATCHES.map(b => (
            <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: batchColour[b.id] }} />
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>{b.name} ({b.division})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 32, maxWidth: 1400 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 12 },
  cell: { padding: '5px 8px', borderRadius: 5, marginBottom: 3, cursor: 'default' },
};
