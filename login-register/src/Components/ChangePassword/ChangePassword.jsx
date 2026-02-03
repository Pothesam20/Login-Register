import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import './ChangePassword.css';

const ChangePassword = ({ user }) => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    username: user?.username || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Password visibility state
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error and success state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate password requirements
  const validatePasswordRequirements = (password) => {
    const errors = [];
    
    if (password.length < 5) {
      errors.push('At least 5 characters');
    }
    if (password.length > 12) {
      errors.push('Maximum 12 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('At least 1 uppercase letter');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('At least 1 special character');
    }

    return errors;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Old password validation
    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = 'Current password is required';
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else {
      const passwordErrors = validatePasswordRequirements(formData.newPassword);
      if (passwordErrors.length > 0) {
        newErrors.newPassword = passwordErrors.join(', ');
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if old password equals new password
    if (formData.oldPassword && formData.newPassword && formData.oldPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate password update
    setIsSubmitting(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setSuccessMessage('Password changed successfully! Redirecting to profile...');
      setFormData({
        username: user?.username || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});
      setIsSubmitting(false);

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }, 1000);
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/profile');
  };

  // Check if form is valid for submit button
  const isFormValid = 
    formData.username.trim() !== '' &&
    formData.oldPassword.trim() !== '' &&
    formData.newPassword.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    Object.keys(errors).length === 0;

  return (
    <div className="change-password-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleCancel}>
        <FaArrowLeft /> Back to Profile
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Main Card */}
      <div className="change-password-card">
        {/* Header */}
        <div className="card-header">
          <h1>Change Password</h1>
          <p>Update your account password securely</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="change-password-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                readOnly
              />
            </div>
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          {/* Old Password Field */}
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="oldPassword"
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowOldPassword(!showOldPassword)}
                title={showOldPassword ? 'Hide password' : 'Show password'}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.oldPassword && (
              <span className="error-message">{errors.oldPassword}</span>
            )}
          </div>

          {/* New Password Field */}
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
                title={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}
            {/* Password Requirements */}
            <div className="requirements">
              <p className="requirements-title">Password Requirements:</p>
              <ul className="requirements-list">
                <li className={formData.newPassword.length >= 5 && formData.newPassword.length <= 12 ? 'valid' : ''}>
                  5–12 characters
                </li>
                <li className={/[A-Z]/.test(formData.newPassword) ? 'valid' : ''}>
                  At least 1 uppercase letter
                </li>
                <li className={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.newPassword) ? 'valid' : ''}>
                  At least 1 special character
                </li>
              </ul>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
            {formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
              <span className="success-check">✓ Passwords match</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button
              type="submit"
              className="save-btn"
              disabled={!isFormValid || isSubmitting}
            >
              <FaSave /> {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
