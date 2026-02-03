import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPhone, FaCalendar, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormCard, FormField, DefaultSecurityQuestions } from './FormCard';
import { authAPI, tokenManager } from '../../services/api';
import './LoginRegister.css';

const LoginRegister = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login state
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  
  // Register state
  const [registerData, setRegisterData] = useState({
    username: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    passwordChangeDate: new Date().toISOString().split('T')[0],
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  // Login handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (loginErrors[name]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!loginData.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    
    try {
      // Call backend API for login
      const response = await authAPI.login({
        username: loginData.username,
        password: loginData.password,
      });
      
      // Store JWT token
      tokenManager.setToken(response.token);
      
      // Store user data
      const userData = { 
        username: response.username,
        phoneNumber: response.phoneNumber || '',
        dateOfBirth: response.dateOfBirth || ''
      };
      localStorage.setItem('authUser', JSON.stringify(userData));
      onLoginSuccess(userData);
      
      // Clear form and redirect
      setLoginData({ username: '', password: '' });
      setLoginErrors({});
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginErrors({ 
        general: error.message || 'Login failed. Please check your credentials.' 
      });
    }
  };

  // Register handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number - only allow numbers
    if (name === 'phoneNumber') {
      // Remove all non-numeric characters and limit to 10 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setRegisterData(prev => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setRegisterData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateRegister = () => {
    const errors = {};
    
    // Username validation (must be unique)
    if (!registerData.username.trim()) {
      errors.username = 'Username is required';
    } else if (registerData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    // Phone number validation (numeric only, max 10 digits)
    if (!registerData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(registerData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    
    // Date of Birth validation
    if (!registerData.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of Birth is required';
    }
    
    // Password validation (8-12 chars, alphanumeric, 1 special, 1 capital)
    if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else {
      const pwd = registerData.password;
      if (pwd.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (pwd.length > 12) {
        errors.password = 'Password must not exceed 12 characters';
      } else if (!/[A-Z]/.test(pwd)) {
        errors.password = 'Password must contain at least 1 uppercase letter';
      } else if (!/[a-z]/.test(pwd)) {
        errors.password = 'Password must contain at least 1 lowercase letter';
      } else if (!/\d/.test(pwd)) {
        errors.password = 'Password must contain at least 1 number';
      } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
        errors.password = 'Password must contain at least 1 special character';
      }
    }
    
    // Confirm Password validation
    if (!registerData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Security Questions validation
    if (!registerData.securityQuestion1.trim()) {
      errors.securityQuestion1 = 'Security Question 1 is required';
    }
    if (!registerData.securityAnswer1.trim()) {
      errors.securityAnswer1 = 'Security Answer 1 is required';
    }
    if (!registerData.securityQuestion2.trim()) {
      errors.securityQuestion2 = 'Security Question 2 is required';
    }
    if (!registerData.securityAnswer2.trim()) {
      errors.securityAnswer2 = 'Security Answer 2 is required';
    }
    
    // Check for duplicate questions
    if (registerData.securityQuestion1 && registerData.securityQuestion2 && 
        registerData.securityQuestion1 === registerData.securityQuestion2) {
      errors.securityQuestion2 = 'Please select a different question';
    }
    
    // Password Change Date validation
    if (!registerData.passwordChangeDate.trim()) {
      errors.passwordChangeDate = 'Password Change Date is required';
    }
    
    return errors;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegister();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    
    try {
      // Call backend API for registration
      const response = await authAPI.register({
        username: registerData.username,
        phoneNumber: registerData.phoneNumber,
        dateOfBirth: registerData.dateOfBirth,
        password: registerData.password,
        securityQuestion1: registerData.securityQuestion1,
        securityAnswer1: registerData.securityAnswer1,
        securityQuestion2: registerData.securityQuestion2,
        securityAnswer2: registerData.securityAnswer2,
      });
      
      // Store JWT token
      tokenManager.setToken(response.token);
      
      // Store user data
      const userData = {
        username: response.username,
        phoneNumber: response.phoneNumber,
        dateOfBirth: response.dateOfBirth,
      };
      localStorage.setItem('authUser', JSON.stringify(userData));
      onLoginSuccess(userData);
      
      // Show success message
      alert(`Registration successful!\nUsername: ${registerData.username}\nPhone: ${registerData.phoneNumber}\nDOB: ${registerData.dateOfBirth}`);
      
      // Clear form and redirect
      setRegisterData({ 
        username: '', 
        phoneNumber: '', 
        dateOfBirth: '', 
        password: '', 
        confirmPassword: '',
        securityQuestion1: '',
        securityAnswer1: '',
        securityQuestion2: '',
        securityAnswer2: '',
        passwordChangeDate: new Date().toISOString().split('T')[0],
      });
      setRegisterErrors({});
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterErrors({ 
        general: error.message || 'Registration failed. Please try again.' 
      });
    }
  };

  return (
    <div className="login-register-container">
      {/* Navigation Tabs */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Left Side - Forms Container */}
        <div className="forms-wrapper">
          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="login-container">
              <h1 className="login-title">LOGIN</h1>
              
              <form onSubmit={handleLoginSubmit} className="login-form">
                {/* General Error Message */}
                {loginErrors.general && (
                  <div className="general-error-message">
                    {loginErrors.general}
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
                      value={loginData.username}
                      onChange={handleLoginChange}
                      className="form-input"
                    />
                  </div>
                  {loginErrors.username && (
                    <span className="error-message">{loginErrors.username}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="field-label">Password</label>
                  <div className="input-container">
                    <FaLock className="input-icon" />
                    <input
                      id="password"
                      type={showLoginPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="eye-toggle-btn"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <span className="error-message">{loginErrors.password}</span>
                  )}
                </div>

                {/* Login Button */}
                <button type="submit" className="login-btn">
                  LOGIN
                </button>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button
                    type="button"
                    className="action-link change-password-link"
                    onClick={() => navigate('/change-password')}
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    className="action-link forgot-password-link"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <FormCard
              title="User Registration"
              onSubmit={handleRegisterSubmit}
              submitText="SAVE"
              className="register-form"
            >
              {/* General Error Message */}
              {registerErrors.general && (
                <div className="general-error-message">
                  {registerErrors.general}
                </div>
              )}
              
              <FormField
                label="Username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                placeholder="Enter unique username"
                icon={FaUser}
                error={registerErrors.username}
              />

              <FormField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={registerData.phoneNumber}
                onChange={handleRegisterChange}
                placeholder="10-digit phone number (numbers only)"
                icon={FaPhone}
                error={registerErrors.phoneNumber}
                maxLength="10"
                pattern="[0-9]*"
                inputMode="numeric"
              />

              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={registerData.dateOfBirth}
                onChange={handleRegisterChange}
                icon={FaCalendar}
                error={registerErrors.dateOfBirth}
              />

              <FormField
                label="Password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="8-12 chars, alphanumeric, 1 special, 1 capital"
                icon={FaLock}
                error={registerErrors.password}
                showPassword={showRegisterPassword}
                onTogglePassword={() => setShowRegisterPassword(!showRegisterPassword)}
              />

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="Confirm your password"
                icon={FaLock}
                error={registerErrors.confirmPassword}
                showPassword={showRegisterConfirmPassword}
                onTogglePassword={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
              />

              <DefaultSecurityQuestions
                questions={registerData}
                answers={registerData}
                onChange={handleRegisterChange}
                errors={registerErrors}
              />

              <FormField
                label="Password Change Date"
                name="passwordChangeDate"
                type="date"
                value={registerData.passwordChangeDate}
                onChange={handleRegisterChange}
                icon={FaCalendar}
                error={registerErrors.passwordChangeDate}
              />
            </FormCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;