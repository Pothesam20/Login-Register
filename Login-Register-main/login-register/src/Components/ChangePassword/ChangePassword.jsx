import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Minimum 8 characters');
    if (password.length > 12) errors.push('Maximum 12 characters');
    if (!/[A-Z]/.test(password)) errors.push('At least 1 uppercase letter');
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) errors.push('Must be alphanumeric');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('At least 1 special character');
    return errors;
  };

  useEffect(() => {
    const newErrors = {};

    // Validate new password
    if (formData.newPassword) {
      const passwordErrors = validatePassword(formData.newPassword);
      if (passwordErrors.length > 0) {
        newErrors.newPassword = passwordErrors;
      }

      // Check if new password is same as old password
      if (formData.oldPassword && formData.oldPassword === formData.newPassword) {
        newErrors.samePassword = 'New password must be different from old password';
      }
    }

    // Validate confirm password
    if (formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
  }, [formData.oldPassword, formData.newPassword, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock password change
      alert('Password changed successfully!');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const isFormValid = () => {
    return (
      formData.oldPassword &&
      formData.newPassword &&
      formData.confirmPassword &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <button 
          className="back-arrow" 
          onClick={() => navigate(-1)} 
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <div className="lock-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>

        <h1 className="change-title">Change Password</h1>
        <p className="change-subtitle">Enter your current and new password</p>

        <form onSubmit={handleSubmit} className="change-form">
          {errors.submit && (
            <div className="error-alert">{errors.submit}</div>
          )}

          {/* Old Password */}
          <div className="input-group">
            <label htmlFor="oldPassword" className="input-label">Old Password</label>
            <div className="input-with-icon">
              <input
                id="oldPassword"
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                placeholder="Enter old password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="input-field"
                required
                aria-label="Old password"
              />
              <button
                type="button"
                className="eye-icon-btn"
                onClick={() => setShowOldPassword(!showOldPassword)}
                aria-label={showOldPassword ? 'Hide old password' : 'Show old password'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showOldPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="input-group">
            <label htmlFor="newPassword" className="input-label">New Password</label>
            <div className="input-with-icon">
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="input-field"
                required
                aria-label="New password"
              />
              <button
                type="button"
                className="eye-icon-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showNewPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.newPassword && (
              <div className="validation-list">
                {errors.newPassword.map((err, idx) => (
                  <span key={idx} className="error-text">• {err}</span>
                ))}
              </div>
            )}
            {errors.samePassword && (
              <span className="error-text">{errors.samePassword}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <div className="input-with-icon">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                className="input-field"
                required
                aria-label="Confirm password"
              />
              <button
                type="button"
                className="eye-icon-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showConfirmPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button" 
            disabled={!isFormValid() || loading}
            aria-label="Confirm password change"
          >
            {loading ? 'CHANGING...' : 'CONFIRM CHANGE'}
          </button>

          <div className="back-to-login">
            <button 
              type="button" 
              className="back-link" 
              onClick={() => navigate('/')}
              aria-label="Back to login page"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
