import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Labs from './pages/Labs';
import Batches from './pages/Batches';
import Schedule from './pages/Schedule';
import Timetable from './pages/Timetable';
import Clashes from './pages/Clashes';
import Admin from './pages/Admin';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/LabManagementSystem">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="labs"      element={<Labs />} />
            <Route path="batches"   element={<Batches />} />
            <Route path="schedule"  element={<Schedule />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="clashes"   element={<Clashes />} />
            <Route path="admin"     element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
