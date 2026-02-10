import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setError('');
    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock authentication - check against stored users
      if (formData.email && formData.password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
          (u.email === formData.email || u.username === formData.email) && 
          u.password === formData.password
        );

        if (user) {
          // Check password expiration (1 month = 30 days)
          if (user.passwordChangeDate) {
            const passwordDate = new Date(user.passwordChangeDate);
            const today = new Date();
            const daysDifference = Math.floor((today - passwordDate) / (1000 * 60 * 60 * 24));
            
            if (daysDifference > 30) {
              alert('Your Password is Expired. Please Change');
              setLoading(false);
              navigate('/change-password');
              return;
            }
          }

          // Store user data
          localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
          localStorage.setItem('username', user.username || user.email.split('@')[0]);
          localStorage.setItem('userId', user.email);
          
          alert('Login successful!');
          setLoading(false);
          navigate('/dashboard');
        } else {
          setError('Invalid email/username or password');
          setLoading(false);
        }
      } else {
        setError('Please enter both email and password');
        setLoading(false);
      }
    }, 800);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Left Side - Illustration */}
      <div className="login-left">
        <div className="illustration-content">
          <div className="illustration-placeholder">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
              <circle cx="150" cy="150" r="100" fill="rgba(255,255,255,0.2)" />
              <circle cx="150" cy="150" r="70" fill="rgba(255,255,255,0.3)" />
              <circle cx="150" cy="150" r="40" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>
          <h2 className="welcome-text">Welcome Back!</h2>
          <p className="welcome-subtitle">Login to access your account</p>
        </div>
      </div>

      {/* Right Side - Login Form Card */}
      <div className="login-right">
        <div className="login-card">
          <h1 className="login-title">Candidate Login</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-alert">
                {error}
              </div>
            )}

            {/* Email / Enrollment Input */}
            <div className="input-group">
              <input
                type="text"
                name="email"
                placeholder="Email / Enrollment"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
                autoComplete="username"
              />
            </div>

            {/* Password Input with Eye Icon */}
            <div className="input-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Links Row - Forgot Password and Change Password */}
            <div className="links-row">
              <button
                type="button"
                className="text-link"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
              <button
                type="button"
                className="text-link"
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </button>
            </div>

            {/* Register Section */}
            <div className="register-section">
              <p className="register-text">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="register-link"
                  onClick={() => navigate('/register')}
                >
                  Register here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
