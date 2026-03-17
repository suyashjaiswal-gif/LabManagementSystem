import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Demo credentials — replace with real API auth
const DEMO_USERS = [
  { username: 'admin',   password: 'admin123',  role: 'admin',   name: 'Administrator' },
  { username: 'faculty', password: 'faculty123', role: 'faculty', name: 'Prof. A. Sharma' },
  { username: 'staff',   password: 'staff123',   role: 'staff',   name: 'Lab Staff' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('lms_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = (username, password) => {
    const found = DEMO_USERS.find(u => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      localStorage.setItem('lms_user', JSON.stringify(safeUser));
      setUser(safeUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('lms_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
