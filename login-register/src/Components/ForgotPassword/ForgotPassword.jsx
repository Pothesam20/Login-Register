import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaArrowLeft } from 'react-icons/fa';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Initial form, Step 2: Success
  
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    securityQuestion1: '',
    securityQuestion2: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits
    if (name === 'phoneNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    
    // Security Question 1 validation
    if (!formData.securityQuestion1.trim()) {
      newErrors.securityQuestion1 = 'This field is required';
    }
    
    // Security Question 2 validation
    if (!formData.securityQuestion2.trim()) {
      newErrors.securityQuestion2 = 'This field is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate successful verification
    setStep(2);
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="forgot-password-container">
      {step === 1 ? (
        <>
          {/* Back Button */}
          <button className="back-to-login-btn" onClick={handleBackToLogin}>
            <FaArrowLeft className="back-icon" />
            Back to Login
          </button>

          {/* Form */}
          <div className="forgot-password-form-wrapper">
            <h2>Forgot Password</h2>
            <p className="form-subtitle">Verify your identity to reset your password</p>
            
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <div className="input-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    maxLength="10"
                  />
                </div>
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </div>

              {/* Security Question 1 */}
              <div className="form-group">
                <label htmlFor="securityQuestion1">What is your favorite color?</label>
                <input
                  id="securityQuestion1"
                  type="text"
                  name="securityQuestion1"
                  placeholder="Enter your answer"
                  value={formData.securityQuestion1}
                  onChange={handleChange}
                  className="security-input"
                />
                {errors.securityQuestion1 && (
                  <span className="error-message">{errors.securityQuestion1}</span>
                )}
              </div>

              {/* Security Question 2 */}
              <div className="form-group">
                <label htmlFor="securityQuestion2">What is your nickname?</label>
                <input
                  id="securityQuestion2"
                  type="text"
                  name="securityQuestion2"
                  placeholder="Enter your answer"
                  value={formData.securityQuestion2}
                  onChange={handleChange}
                  className="security-input"
                />
                {errors.securityQuestion2 && (
                  <span className="error-message">{errors.securityQuestion2}</span>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Verify & Reset Password
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* Success Message */}
          <div className="success-wrapper">
            <div className="success-icon">✓</div>
            <h2>Verification Successful!</h2>
            <p className="success-message">
              Your password reset link has been sent to your registered email address.
            </p>
            <p className="success-subtext">
              Please check your email and follow the instructions to reset your password.
            </p>
            <button className="back-to-login-btn" onClick={handleBackToLogin}>
              <FaArrowLeft className="back-icon" />
              Back to Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
