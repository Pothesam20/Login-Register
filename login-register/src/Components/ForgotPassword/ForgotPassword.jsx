import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const securityQuestions = [
    'What is your nickname?',
    'What is your favorite colour?',
    'Where were you born?'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.phoneNumber.length !== 10 || !/^\d+$/.test(formData.phoneNumber)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    if (formData.securityQuestion1 === formData.securityQuestion2) {
      setError('Please select different security questions');
      return;
    }

    if (!formData.email || !formData.securityAnswer1 || !formData.securityAnswer2) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert('Password reset link has been sent to your email!');
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left">
        <div className="left-overlay">
          <h2 className="left-title">Forgot Password?</h2>
          <p className="left-subtitle">Don't worry, we'll help you reset it</p>
        </div>
      </div>

      <div className="forgot-password-right">
        <div className="forgot-form-wrapper">
          <h1 className="forgot-title">Reset Password</h1>
          <p className="forgot-subtitle">Verify your details to reset your password</p>

          <form onSubmit={handleSubmit} className="forgot-form">
            {error && (
              <div className="error-alert">{error}</div>
            )}

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
                aria-label="Email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="phoneNumber" className="input-label">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Enter 10 digit phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-field"
                maxLength="10"
                required
                aria-label="Phone number"
              />
              <span className="helper-text">Must be 10 digit number</span>
            </div>

            <div className="security-section">
              <h3 className="section-title">Security Verification</h3>

              <div className="input-group">
                <label htmlFor="securityQuestion1" className="input-label">Security Question 1</label>
                <select
                  id="securityQuestion1"
                  name="securityQuestion1"
                  value={formData.securityQuestion1}
                  onChange={handleChange}
                  className="input-field"
                  required
                  aria-label="Security question 1"
                >
                  <option value="">Select Question 1</option>
                  {securityQuestions.map((q, idx) => (
                    <option key={idx} value={q}>{q}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="securityAnswer1"
                  placeholder="Your answer"
                  value={formData.securityAnswer1}
                  onChange={handleChange}
                  className="input-field"
                  required
                  aria-label="Answer to security question 1"
                />
              </div>

              <div className="input-group">
                <label htmlFor="securityQuestion2" className="input-label">Security Question 2</label>
                <select
                  id="securityQuestion2"
                  name="securityQuestion2"
                  value={formData.securityQuestion2}
                  onChange={handleChange}
                  className="input-field"
                  required
                  aria-label="Security question 2"
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
                  placeholder="Your answer"
                  value={formData.securityAnswer2}
                  onChange={handleChange}
                  className="input-field"
                  required
                  aria-label="Answer to security question 2"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-button" 
              disabled={loading}
              aria-label="Submit password reset request"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            <div className="back-to-login">
              <button 
                type="button" 
                className="back-link" 
                onClick={() => navigate('/')}
                aria-label="Back to Login Page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back to Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
