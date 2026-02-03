import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaLock, FaToggleOn, FaToggleOff, FaSave } from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();
  
  // Editable sections state
  const [editingBasic, setEditingBasic] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState(false);
  
  // Basic Information
  const [basicInfo, setBasicInfo] = useState({
    username: user?.username || 'john_doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: user?.phoneNumber || '1234567890',
    dateOfBirth: user?.dateOfBirth || '2000-01-15',
    gender: 'Male',
  });

  // Professional Information
  const [professionalInfo, setProfessionalInfo] = useState({
    role: 'Software Engineer',
    organization: 'Tech Corp',
    skills: 'React, JavaScript, CSS',
    experience: '3 years',
  });

  // Activity Data (display-only)
  const [activityData] = useState({
    lastLogin: new Date().toLocaleString(),
    loginCount: 23,
    accountStatus: 'Active',
  });

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    privacySettings: 'public',
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Basic Info Change
  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Professional Info Change
  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save Basic Info
  const handleSaveBasic = () => {
    setSuccessMessage('Basic information updated successfully!');
    setEditingBasic(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle Save Professional Info
  const handleSaveProfessional = () => {
    setSuccessMessage('Professional information updated successfully!');
    setEditingProfessional(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle Toggle Settings
  const toggleSetting = (setting) => {
    setAccountSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="user-profile-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Back to Dashboard
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account information and settings</p>
      </div>

      {/* Content Sections */}
      <div className="profile-sections">
        {/* Basic & Personal Information */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Basic & Personal Information</h2>
            <button
              className="edit-btn"
              onClick={() => setEditingBasic(!editingBasic)}
            >
              <FaEdit /> {editingBasic ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="card-content">
            {editingBasic ? (
              <form className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={basicInfo.username}
                      onChange={handleBasicChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={basicInfo.fullName}
                      onChange={handleBasicChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={basicInfo.email}
                      onChange={handleBasicChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={basicInfo.phoneNumber}
                      onChange={handleBasicChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={basicInfo.dateOfBirth}
                      onChange={handleBasicChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={basicInfo.gender} onChange={handleBasicChange}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <button type="button" className="save-btn" onClick={handleSaveBasic}>
                  <FaSave /> Save Changes
                </button>
              </form>
            ) : (
              <div className="info-display">
                <div className="info-row">
                  <div className="info-item">
                    <label>Username:</label>
                    <span>{basicInfo.username}</span>
                  </div>
                  <div className="info-item">
                    <label>Full Name:</label>
                    <span>{basicInfo.fullName}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <label>Email Address:</label>
                    <span>{basicInfo.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone Number:</label>
                    <span>{basicInfo.phoneNumber}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <label>Date of Birth:</label>
                    <span>{basicInfo.dateOfBirth}</span>
                  </div>
                  <div className="info-item">
                    <label>Gender:</label>
                    <span>{basicInfo.gender}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Activity Data */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Activity & Status</h2>
          </div>

          <div className="card-content">
            <div className="info-display">
              <div className="info-row">
                <div className="info-item">
                  <label>Last Login:</label>
                  <span>{activityData.lastLogin}</span>
                </div>
                <div className="info-item">
                  <label>Total Logins:</label>
                  <span>{activityData.loginCount}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <label>Account Status:</label>
                  <span className="status-active">{activityData.accountStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Professional Details</h2>
            <button
              className="edit-btn"
              onClick={() => setEditingProfessional(!editingProfessional)}
            >
              <FaEdit /> {editingProfessional ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="card-content">
            {editingProfessional ? (
              <form className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Role / Designation</label>
                    <input
                      type="text"
                      name="role"
                      value={professionalInfo.role}
                      onChange={handleProfessionalChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Organization / Company</label>
                    <input
                      type="text"
                      name="organization"
                      value={professionalInfo.organization}
                      onChange={handleProfessionalChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Skills or Interests</label>
                    <input
                      type="text"
                      name="skills"
                      value={professionalInfo.skills}
                      onChange={handleProfessionalChange}
                      placeholder="Comma-separated"
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={professionalInfo.experience}
                      onChange={handleProfessionalChange}
                    />
                  </div>
                </div>

                <button type="button" className="save-btn" onClick={handleSaveProfessional}>
                  <FaSave /> Save Changes
                </button>
              </form>
            ) : (
              <div className="info-display">
                <div className="info-row">
                  <div className="info-item">
                    <label>Role / Designation:</label>
                    <span>{professionalInfo.role}</span>
                  </div>
                  <div className="info-item">
                    <label>Organization / Company:</label>
                    <span>{professionalInfo.organization}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <label>Skills or Interests:</label>
                    <span>{professionalInfo.skills}</span>
                  </div>
                  <div className="info-item">
                    <label>Experience:</label>
                    <span>{professionalInfo.experience}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Settings */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Account Settings</h2>
          </div>

          <div className="card-content">
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Email Notifications</label>
                  <p>Receive email updates about your account</p>
                </div>
                <button
                  className="toggle-btn"
                  onClick={() => toggleSetting('emailNotifications')}
                >
                  {accountSettings.emailNotifications ? (
                    <FaToggleOn className="toggle-on" />
                  ) : (
                    <FaToggleOff className="toggle-off" />
                  )}
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Two-Factor Authentication</label>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button
                  className="toggle-btn"
                  onClick={() => toggleSetting('twoFactorAuth')}
                >
                  {accountSettings.twoFactorAuth ? (
                    <FaToggleOn className="toggle-on" />
                  ) : (
                    <FaToggleOff className="toggle-off" />
                  )}
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Privacy Settings</label>
                  <p>Control who can see your profile</p>
                </div>
                <select
                  className="privacy-select"
                  value={accountSettings.privacySettings}
                  onChange={(e) =>
                    setAccountSettings(prev => ({
                      ...prev,
                      privacySettings: e.target.value,
                    }))
                  }
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="profile-card">
          <div className="card-header">
            <h2>
              <FaLock /> Change Password
            </h2>
          </div>

          <div className="card-content">
            <button
              className="change-password-btn"
              onClick={() => navigate('/change-password')}
            >
              Change Your Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
