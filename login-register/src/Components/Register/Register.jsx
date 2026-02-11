import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    passwordChangeDate: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const securityQuestions = [
    'What is your nickname?',
    'What is your favorite colour?',
    'Where were you born?'
  ];

  // Prevent browser back button
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Minimum 8 characters');
    if (password.length > 12) errors.push('Maximum 12 characters');
    if (!/[A-Z]/.test(password)) errors.push('Minimum 1 capital letter');
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) errors.push('Must be alphanumeric');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Minimum 1 special character');
    return errors;
  };

  useEffect(() => {
    const passwordErrors = validatePassword(formData.password);
    if (formData.password && passwordErrors.length > 0) {
      setErrors(prev => ({ ...prev, password: passwordErrors }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  }, [formData.password]);

  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  }, [formData.confirmPassword, formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Username validation
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Phone validation
    if (formData.phoneNumber.length !== 10 || !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Must be 10 digit number only';
    }

    // Password validation
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Security questions validation
    if (formData.securityQuestion1 === formData.securityQuestion2) {
      newErrors.securityQuestion2 = 'Please select different questions';
    }

    // If there are validation errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const existingUser = users.find(u => u.email === formData.email || u.username === formData.username);
      if (existingUser) {
        setErrors({ submit: 'User with this email or username already exists' });
        setLoading(false);
        return;
      }

      users.push({
        email: formData.email,
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        securityQuestion1: formData.securityQuestion1,
        securityAnswer1: formData.securityAnswer1,
        securityQuestion2: formData.securityQuestion2,
        securityAnswer2: formData.securityAnswer2,
        passwordChangeDate: formData.passwordChangeDate,
        password: formData.password
      });

      localStorage.setItem('users', JSON.stringify(users));
      
      alert('Registration successful! Please login.');
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="left-overlay">
          <h2 className="left-title">Join Us Today!</h2>
          <p className="left-subtitle">Create your account and start your journey</p>
        </div>
      </div>

      <div className="register-right">
        <div className="register-form-wrapper">
          <h1 className="register-title">User Registration</h1>

          <form onSubmit={handleSubmit} className="register-form">
            {errors.submit && (
              <div className="error-alert">
                <strong>Registration Error:</strong> {errors.submit}
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                required
              />
              {errors.email && <span className="error-text">⚠ {errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`input-field ${errors.username ? 'input-error' : ''}`}
                required
              />
              <span className="helper-text">Do not use abusive characters</span>
              {errors.username && <span className="error-text">⚠ {errors.username}</span>}
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`input-field ${errors.phoneNumber ? 'input-error' : ''}`}
                maxLength="10"
                required
              />
              <span className="helper-text">Must be 10 digit number only</span>
              {errors.phoneNumber && <span className="error-text">⚠ {errors.phoneNumber}</span>}
            </div>

            <div className="input-group">
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onKeyDown={(e) => e.preventDefault()}
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                  required
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
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
              {errors.password && (
                <div className="validation-list">
                  {errors.password.map((err, idx) => (
                    <span key={idx} className="error-text">⚠ {err}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="input-group">
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                  required
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
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
                <span className="error-text">⚠ {errors.confirmPassword}</span>
              )}
              {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                <span className="success-text">✓ Passwords match</span>
              )}
            </div>

            <div className="security-section">
              <h3 className="section-title">Security Questions</h3>
              
              <div className="input-group">
                <select
                  name="securityQuestion1"
                  value={formData.securityQuestion1}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Question 1</option>
                  {securityQuestions.map((q, idx) => (
                    <option key={idx} value={q}>{q}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="securityAnswer1"
                  placeholder="Answer"
                  value={formData.securityAnswer1}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <select
                  name="securityQuestion2"
                  value={formData.securityQuestion2}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Question 2</option>
                  {securityQuestions
                    .filter(q => q !== formData.securityQuestion1)
                    .map((q, idx) => (
                      <option key={idx} value={q}>{q}</option>
                    ))}
                </select>
                <input
                  type="text"
                  name="securityAnswer2"
                  placeholder="Answer"
                  value={formData.securityAnswer2}
                  onChange={handleChange}
                  className={`input-field ${errors.securityQuestion2 ? 'input-error' : ''}`}
                  required
                />
                {errors.securityQuestion2 && <span className="error-text">⚠ {errors.securityQuestion2}</span>}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password Last Changed Date</label>
              <input
                type="date"
                name="passwordChangeDate"
                value={formData.passwordChangeDate}
                onChange={handleChange}
                onKeyDown={(e) => e.preventDefault()}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>

            <div className="back-to-login">
              <button type="button" className="back-link" onClick={() => navigate('/')}>
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
