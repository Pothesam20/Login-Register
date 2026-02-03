import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import UserProfile from './Components/UserProfile/UserProfile';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { tokenManager } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    const token = tokenManager.getToken();
    
    if (authUser && token) {
      try {
        const userData = JSON.parse(authUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing auth user:', error);
        localStorage.removeItem('authUser');
        tokenManager.removeToken();
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    tokenManager.removeToken();
    localStorage.removeItem('authUser');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginRegister onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard user={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserProfile user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={<ChangePassword user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

