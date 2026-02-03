import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FormCard, FormField } from '../LoginRegister/FormCard';
import { authAPI, tokenManager } from '../../services/api';
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call backend API for password change
      await authAPI.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      
      setSuccessMessage('Password changed successfully! Redirecting to login...');
      setFormData({
        username: user?.username || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});

      // Redirect to login after 2 seconds
      setTimeout(() => {
        // Clear auth data and redirect to login
        tokenManager.removeToken();
        localStorage.removeItem('authUser');
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Change password error:', error);
      setErrors({ 
        general: error.message || 'Failed to change password. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check password requirements for visual feedback
  const getPasswordRequirementStatus = (password) => {
    return {
      length: password.length >= 5 && password.length <= 12,
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };
  };

  const passwordStatus = getPasswordRequirementStatus(formData.newPassword);

  return (
    <div className="change-password-container">
      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="change-password-content">
        {/* Page Title - Right Aligned */}
        <h1 className="page-title">Change Password</h1>

        {/* Form Card - Same as Registration */}
        <FormCard
          title=""
          onSubmit={handleSubmit}
          submitText={isSubmitting ? 'Saving...' : 'SAVE'}
          className="change-password-form-card"
        >
          {/* General Error Message */}
          {errors.general && (
            <div className="general-error-message">
              {errors.general}
            </div>
          )}
          
          <FormField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            icon={FaUser}
            error={errors.username}
            className={`${user ? 'readonly-field' : ''} custom-field-styling`}
          />

          <FormField
            label="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            placeholder="Enter current password"
            error={errors.oldPassword}
            showPassword={showOldPassword}
            onTogglePassword={() => setShowOldPassword(!showOldPassword)}
            className="custom-field-styling"
          />

          <FormField
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password"
            error={errors.newPassword}
            showPassword={showNewPassword}
            onTogglePassword={() => setShowNewPassword(!showNewPassword)}
            className="custom-field-styling"
          />

          {/* Password Requirements */}
          {formData.newPassword && (
            <div className="password-requirements">
              <div className={`requirement ${passwordStatus.length ? 'valid' : ''}`}>
                5–12 characters
              </div>
              <div className={`requirement ${passwordStatus.uppercase ? 'valid' : ''}`}>
                Minimum 1 uppercase letter
              </div>
              <div className={`requirement ${passwordStatus.special ? 'valid' : ''}`}>
                Minimum 1 special character
              </div>
            </div>
          )}

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm new password"
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            className="custom-field-styling"
          />

          {/* Password Match Indicator */}
          {formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
            <span className="success-check">✓ Passwords match</span>
          )}
        </FormCard>
      </div>
    </div>
  );
};

export default ChangePassword;
