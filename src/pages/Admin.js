import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FACULTY, SUBJECTS } from '../data/placeholders';

export default function Admin() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/dashboard" />;

  const [tab, setTab] = useState('faculty');

  return (
    <div style={styles.page} className="animate-in">
      <div style={styles.header}>
        <div>
          <div className="section-title">Administration</div>
          <h1 className="page-title">Admin Control Panel</h1>
        </div>
        <span className="badge badge-info">Admin Only</span>
      </div>

      <div style={styles.tabs}>
        {['faculty', 'subjects', 'settings'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ ...styles.tab, ...(tab === t ? styles.activeTab : {}) }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'faculty' && <FacultyTab />}
      {tab === 'subjects' && <SubjectsTab />}
      {tab === 'settings' && <SettingsTab />}
    </div>
  );
}

function FacultyTab() {
  const [faculty, setFaculty] = useState(FACULTY);
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="section-title" style={{ margin: 0 }}>Faculty Members</div>
        <button className="btn btn-primary btn-sm">＋ Add Faculty</button>
      </div>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Designation</th><th>Email</th><th></th></tr></thead>
        <tbody>
          {faculty.map(f => (
            <tr key={f.id}>
              <td style={{ fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{f.id}</td>
              <td style={{ color: 'var(--text)', fontWeight: 600 }}>{f.name}</td>
              <td>{f.designation}</td>
              <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{f.email}</td>
              <td><button className="btn btn-secondary btn-sm">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SubjectsTab() {
  const [subjects, setSubjects] = useState(SUBJECTS);
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="section-title" style={{ margin: 0 }}>Subjects / Courses</div>
        <button className="btn btn-primary btn-sm">＋ Add Subject</button>
      </div>
      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Year</th><th>Credits</th><th></th></tr></thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.id}>
              <td style={{ fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{s.code}</td>
              <td style={{ color: 'var(--text)', fontWeight: 600 }}>{s.name}</td>
              <td><span className="badge badge-info">{s.year}</span></td>
              <td style={{ fontFamily: 'var(--mono)' }}>{s.credits}</td>
              <td><button className="btn btn-secondary btn-sm">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="card">
      <div className="section-title">System Settings</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 500 }}>
        {[
          { label: 'Institution Name', placeholder: 'MIT-WPU' },
          { label: 'Department', placeholder: 'Computer Engineering & Technology' },
          { label: 'Academic Year', placeholder: '2024–25' },
          { label: 'Backend API URL', placeholder: 'https://your-api.com/api/v1' },
        ].map(f => (
          <div key={f.label}>
            <label style={styles.label}>{f.label}</label>
            <input placeholder={f.placeholder} defaultValue={f.placeholder} />
          </div>
        ))}
        <div>
          <button className="btn btn-primary">Save Settings</button>
        </div>
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent)', marginBottom: 8 }}>API INTEGRATION NOTE</div>
          <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7 }}>
            Once your Spring Boot backend is ready, replace the placeholder data in <code style={{ color: 'var(--accent2)', background: 'var(--bg2)', padding: '1px 6px', borderRadius: 4 }}>src/data/placeholders.js</code> with
            Axios / Fetch API calls to your REST endpoints.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 32, maxWidth: 1200 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  tabs: { display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 0 },
  tab: { background: 'none', border: 'none', color: 'var(--text3)', fontSize: 14, padding: '10px 18px', borderBottom: '2px solid transparent', transition: 'all 0.15s', cursor: 'pointer' },
  activeTab: { color: 'var(--accent)', borderBottomColor: 'var(--accent)', fontWeight: 600 },
  label: { display: 'block', fontSize: 11, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text3)', marginBottom: 6 },
};
