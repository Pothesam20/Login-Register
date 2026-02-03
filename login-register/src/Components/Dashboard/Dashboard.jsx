import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authUser');
    onLogout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <h1>Dashboard</h1>
        </div>
        <div className="navbar-right">
          {/* User Profile */}
          <div className="user-profile" onClick={handleProfileClick} style={{cursor: 'pointer'}}>
            <FaUser className="profile-icon" />
            <span className="username">{user?.username || 'User'}</span>
          </div>
          
          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2 className="welcome-text">
            Welcome, <span className="username-highlight">{user?.username || 'User'}</span>
          </h2>
          <p className="welcome-subtext">Welcome to the Dashboard</p>
          <div className="user-info">
            <div className="info-card">
              <h3>Account Information</h3>
              <div className="info-item">
                <label>Username:</label>
                <span>{user?.username}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{user?.phoneNumber}</span>
              </div>
              <div className="info-item">
                <label>Date of Birth:</label>
                <span>{user?.dateOfBirth}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
