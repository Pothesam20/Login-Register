import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { authAPI } from '../../services/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
  });
  
  const [errors, setErrors] = useState({});

  // Predefined security questions
  const securityQuestions = [
    { value: '', label: 'Select a security question' },
    { value: 'favorite_color', label: 'What is your favorite color?' },
    { value: 'pet_name', label: 'What is your pet name?' },
    { value: 'birth_place', label: 'Where were you born?' },
    { value: 'first_school', label: 'What was your first school name?' },
    { value: 'mother_maiden', label: "What is your mother's maiden name?" },
    { value: 'favorite_food', label: 'What is your favorite food?' },
  ];

  const handleInputChange = (e) => {
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    
    if (!formData.securityQuestion1) {
      newErrors.securityQuestion1 = 'Please select a security question';
    }
    if (!formData.securityAnswer1.trim()) {
      newErrors.securityAnswer1 = 'Answer is required';
    }
    
    if (!formData.securityQuestion2) {
      newErrors.securityQuestion2 = 'Please select a security question';
    }
    if (!formData.securityAnswer2.trim()) {
      newErrors.securityAnswer2 = 'Answer is required';
    }
    
    if (formData.securityQuestion1 && formData.securityQuestion2 && 
        formData.securityQuestion1 === formData.securityQuestion2) {
      newErrors.securityQuestion2 = 'Please select different security questions';
    }
    
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      // Call backend API for forgot password
      await authAPI.forgotPassword({
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        securityQuestion1: formData.securityQuestion1,
        securityAnswer1: formData.securityAnswer1,
        securityQuestion2: formData.securityQuestion2,
        securityAnswer2: formData.securityAnswer2,
      });
      
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrors({ 
        general: error.message || 'Failed to reset password. Please check your information and try again.' 
      });
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const getAvailableQuestions = (currentQuestion) => {
    return securityQuestions.filter(q => 
      q.value === '' || 
      q.value === currentQuestion || 
      (q.value !== formData.securityQuestion1 && q.value !== formData.securityQuestion2)
    );
  };

  const renderFormContent = () => (
    <>
      <h2>Forgot Password</h2>
      <p className="form-subtitle">Forgot password</p>
      
      <form onSubmit={handleFormSubmit}>
        {/* General Error Message */}
        {errors.general && (
          <div className="general-error-message">
            {errors.general}
          </div>
        )}
        
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username" className="field-label">Username</label>
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phoneNumber" className="field-label">Phone Number</label>
          <div className="input-container">
            <FaPhone className="input-icon" />
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="10-digit phone number (numbers only)"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              maxLength="10"
              className="form-input"
            />
          </div>
          {errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        {/* Security Questions Section */}
        <div className="security-questions-section">
          <h3 className="section-title">Security Questions</h3>
          
          {/* Security Question 1 Row */}
          <div className="security-question-row">
            <div className="question-column">
              <label htmlFor="securityQuestion1">Question 1</label>
              <select
                id="securityQuestion1"
                name="securityQuestion1"
                value={formData.securityQuestion1}
                onChange={handleInputChange}
                className="security-select"
              >
                {getAvailableQuestions(formData.securityQuestion1).map(question => (
                  <option key={question.value} value={question.value}>
                    {question.label}
                  </option>
                ))}
              </select>
              {errors.securityQuestion1 && (
                <span className="error-message">{errors.securityQuestion1}</span>
              )}
            </div>
            
            <div className="answer-column">
              <label htmlFor="securityAnswer1">Answer 1</label>
              <input
                id="securityAnswer1"
                type="text"
                name="securityAnswer1"
                placeholder="Enter your answer"
                value={formData.securityAnswer1}
                onChange={handleInputChange}
                className="security-input"
              />
              {errors.securityAnswer1 && (
                <span className="error-message">{errors.securityAnswer1}</span>
              )}
            </div>
          </div>

          {/* Security Question 2 Row */}
          <div className="security-question-row">
            <div className="question-column">
              <label htmlFor="securityQuestion2">Question 2</label>
              <select
                id="securityQuestion2"
                name="securityQuestion2"
                value={formData.securityQuestion2}
                onChange={handleInputChange}
                className="security-select"
              >
                {getAvailableQuestions(formData.securityQuestion2).map(question => (
                  <option key={question.value} value={question.value}>
                    {question.label}
                  </option>
                ))}
              </select>
              {errors.securityQuestion2 && (
                <span className="error-message">{errors.securityQuestion2}</span>
              )}
            </div>
            
            <div className="answer-column">
              <label htmlFor="securityAnswer2">Answer 2</label>
              <input
                id="securityAnswer2"
                type="text"
                name="securityAnswer2"
                placeholder="Enter your answer"
                value={formData.securityAnswer2}
                onChange={handleInputChange}
                className="security-input"
              />
              {errors.securityAnswer2 && (
                <span className="error-message">{errors.securityAnswer2}</span>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Verify & Reset Password
        </button>
      </form>
    </>
  );

  const renderSuccessContent = () => (
    <>
      <div className="success-icon">
        <FaCheckCircle />
      </div>
      <h2>Verification Successful!</h2>
      <p className="success-message">
        Your password reset link has been sent to your registered email address.
      </p>
      <p className="success-subtext">
        Please check your email and follow the instructions to reset your password.
      </p>
    </>
  );

  return (
    <div className="forgot-password-container">
      {/* Back Button */}
      <button className="back-to-login-btn" onClick={handleBackToLogin}>
        <FaArrowLeft className="back-icon" />
        Back to Login
      </button>

      {/* Main Content Card */}
      <div className={`forgot-password-form-wrapper ${isSuccess ? 'success-wrapper' : ''}`}>
        {isSuccess ? renderSuccessContent() : renderFormContent()}
      </div>
    </div>
  );
};

export default ForgotPassword;
