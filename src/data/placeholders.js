// ============================================================
// PLACEHOLDER DATA — Replace with real API calls / backend data
// ============================================================

export const LABS = [
  { id: 'LAB-A', name: 'Lab A — Ground Floor', totalPCs: 40, functionalPCs: 38, location: 'Block A, GF' },
  { id: 'LAB-B', name: 'Lab B — First Floor',  totalPCs: 35, functionalPCs: 30, location: 'Block A, 1F' },
  { id: 'LAB-C', name: 'Lab C — Second Floor', totalPCs: 45, functionalPCs: 45, location: 'Block B, 2F' },
];

export const BATCHES = [
  { id: 'B1', name: 'Batch A1', division: 'CSE-A', year: 'SY', strength: 30 },
  { id: 'B2', name: 'Batch A2', division: 'CSE-A', year: 'SY', strength: 28 },
  { id: 'B3', name: 'Batch B1', division: 'CSE-B', year: 'TY', strength: 32 },
  { id: 'B4', name: 'Batch B2', division: 'CSE-B', year: 'TY', strength: 29 },
  { id: 'B5', name: 'Batch C1', division: 'CSE-C', year: 'BE', strength: 25 },
];

export const SUBJECTS = [
  { id: 'S1', code: 'CSL301', name: 'Data Structures Lab',      year: 'SY', credits: 2 },
  { id: 'S2', code: 'CSL302', name: 'DBMS Lab',                 year: 'SY', credits: 2 },
  { id: 'S3', code: 'CSL401', name: 'Operating Systems Lab',    year: 'TY', credits: 2 },
  { id: 'S4', code: 'CSL402', name: 'Computer Networks Lab',    year: 'TY', credits: 2 },
  { id: 'S5', code: 'CSL501', name: 'Machine Learning Lab',     year: 'BE', credits: 2 },
  { id: 'S6', code: 'CSL502', name: 'Web Technologies Lab',     year: 'BE', credits: 2 },
];

export const FACULTY = [
  { id: 'F1', name: 'Prof. A. Sharma',   designation: 'Assistant Professor', email: 'a.sharma@mitwpu.edu.in' },
  { id: 'F2', name: 'Prof. B. Kulkarni', designation: 'Associate Professor', email: 'b.kulkarni@mitwpu.edu.in' },
  { id: 'F3', name: 'Prof. C. Patil',    designation: 'Assistant Professor', email: 'c.patil@mitwpu.edu.in' },
  { id: 'F4', name: 'Prof. D. Mehta',    designation: 'Professor',           email: 'd.mehta@mitwpu.edu.in' },
];

export const TIME_SLOTS = [
  '08:00 – 09:00', '09:00 – 10:00', '10:00 – 11:00',
  '11:00 – 12:00', '12:00 – 01:00', '01:00 – 02:00',
  '02:00 – 03:00', '03:00 – 04:00', '04:00 – 05:00',
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Placeholder scheduled sessions — replace with API data
export const SESSIONS = [
  { id: 'SES1', batchId: 'B1', subjectId: 'S1', labId: 'LAB-A', facultyId: 'F1', day: 'Monday',    slot: '09:00 – 10:00', status: 'confirmed' },
  { id: 'SES2', batchId: 'B2', subjectId: 'S2', labId: 'LAB-B', facultyId: 'F2', day: 'Monday',    slot: '11:00 – 12:00', status: 'confirmed' },
  { id: 'SES3', batchId: 'B3', subjectId: 'S3', labId: 'LAB-A', facultyId: 'F3', day: 'Tuesday',   slot: '09:00 – 10:00', status: 'confirmed' },
  { id: 'SES4', batchId: 'B4', subjectId: 'S4', labId: 'LAB-C', facultyId: 'F4', day: 'Wednesday', slot: '02:00 – 03:00', status: 'confirmed' },
  { id: 'SES5', batchId: 'B5', subjectId: 'S5', labId: 'LAB-B', facultyId: 'F1', day: 'Thursday',  slot: '10:00 – 11:00', status: 'pending'   },
  { id: 'SES6', batchId: 'B1', subjectId: 'S6', labId: 'LAB-C', facultyId: 'F2', day: 'Friday',    slot: '01:00 – 02:00', status: 'confirmed' },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'warning', message: 'Lab B has 5 PCs under maintenance — batch capacity may be affected.', time: '2h ago' },
  { id: 2, type: 'info',    message: 'Timetable for SY CSE updated for next week.',                        time: '5h ago' },
  { id: 3, type: 'success', message: 'All BE sessions for this week confirmed successfully.',               time: '1d ago' },
];
