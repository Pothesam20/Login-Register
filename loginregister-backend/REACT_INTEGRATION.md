# React Frontend Integration Guide

## 🔗 Connecting React Frontend to Spring Boot Backend

This guide will help you integrate your React login/register application with the Spring Boot backend.

## 1. Backend API Configuration

### Base URL Setup

Create a file `src/services/api.js` in your React project:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Environment Configuration

Create `.env` in your React project root:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_JWT_TOKEN_KEY=authToken
```

## 2. Authentication Service

Create `src/services/authService.js`:

```javascript
import api from './api';

const authService = {
  // Register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('authUser', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Login
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('authUser', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  },

  // Forgot Password
  forgotPassword: async (forgotPasswordData) => {
    return await api.post('/auth/forgot-password', forgotPasswordData);
  },

  // Change Password
  changePassword: async (passwordData) => {
    return await api.post('/auth/change-password', passwordData);
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
```

## 3. Update LoginRegister Component

Update your `LoginRegister.jsx` to use the backend:

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './LoginRegister.css';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPhone, FaCalendar } from 'react-icons/fa';

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
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Register state
  const [registerData, setRegisterData] = useState({
    username: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    favoriteColor: '',
    nickName: '',
    petName: '',
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerLoading, setRegisterLoading] = useState(false);

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
      setLoginLoading(true);
      const response = await authService.login(loginData.username, loginData.password);
      onLoginSuccess(response);
      setLoginData({ username: '', password: '' });
      setLoginErrors({});
      navigate('/dashboard');
    } catch (error) {
      setLoginErrors({
        submit: error.response?.data?.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // Register handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateRegister = () => {
    const errors = {};
    
    if (!registerData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!registerData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(registerData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    
    if (!registerData.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of Birth is required';
    }
    
    if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else {
      const pwd = registerData.password;
      if (pwd.length < 5) {
        errors.password = 'Password must be at least 5 characters';
      } else if (pwd.length > 12) {
        errors.password = 'Password must not exceed 12 characters';
      } else if (!/[A-Z]/.test(pwd)) {
        errors.password = 'Password must contain at least 1 uppercase letter';
      } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
        errors.password = 'Password must contain at least 1 special character';
      }
    }
    
    if (!registerData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!registerData.favoriteColor.trim()) {
      errors.favoriteColor = 'Favorite color is required';
    }
    if (!registerData.nickName.trim()) {
      errors.nickName = 'Nick name is required';
    }
    if (!registerData.petName.trim()) {
      errors.petName = 'Pet name is required';
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
      setRegisterLoading(true);
      const response = await authService.register(registerData);
      onLoginSuccess(response);
      setRegisterData({
        username: '',
        phoneNumber: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        favoriteColor: '',
        nickName: '',
        petName: '',
      });
      setRegisterErrors({});
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.validationErrors?.username ||
                          'Registration failed. Please try again.';
      setRegisterErrors({ submit: errorMessage });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="login-register-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <button
            className={`nav-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Forms Container */}
      <div className="forms-container">
        {/* Login Form */}
        {activeTab === 'login' && (
          <div className="form-wrapper login-form">
            <h2>Login</h2>
            {loginErrors.submit && (
              <div className="error-message" style={{ textAlign: 'center', marginBottom: '15px' }}>
                {loginErrors.submit}
              </div>
            )}
            <form onSubmit={handleLoginSubmit}>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="login-username">Username</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    id="login-username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    disabled={loginLoading}
                  />
                </div>
                {loginErrors.username && (
                  <span className="error-message">{loginErrors.username}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    disabled={loginLoading}
                  />
                  <button
                    type="button"
                    className="eye-icon-btn"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {loginErrors.password && (
                  <span className="error-message">{loginErrors.password}</span>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="forgot-password">
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loginLoading}
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <div className="form-wrapper register-form">
            <h2>Register</h2>
            {registerErrors.submit && (
              <div className="error-message" style={{ textAlign: 'center', marginBottom: '15px' }}>
                {registerErrors.submit}
              </div>
            )}
            <form onSubmit={handleRegisterSubmit}>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="register-username">Username</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    id="register-username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    disabled={registerLoading}
                  />
                </div>
                {registerErrors.username && (
                  <span className="error-message">{registerErrors.username}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="register-phone">Phone Number</label>
                <div className="input-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    id="register-phone"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter 10-digit phone number"
                    value={registerData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleRegisterChange({ 
                        target: { name: 'phoneNumber', value } 
                      });
                    }}
                    maxLength="10"
                    disabled={registerLoading}
                  />
                </div>
                {registerErrors.phoneNumber && (
                  <span className="error-message">{registerErrors.phoneNumber}</span>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label htmlFor="register-dob">Date of Birth</label>
                <div className="input-wrapper">
                  <FaCalendar className="input-icon" />
                  <input
                    id="register-dob"
                    type="date"
                    name="dateOfBirth"
                    value={registerData.dateOfBirth}
                    onChange={handleRegisterChange}
                    disabled={registerLoading}
                  />
                </div>
                {registerErrors.dateOfBirth && (
                  <span className="error-message">{registerErrors.dateOfBirth}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    id="register-password"
                    type={showRegisterPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 5, Max 12 chars, 1 uppercase, 1 special"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    disabled={registerLoading}
                  />
                  <button
                    type="button"
                    className="eye-icon-btn"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {registerErrors.password && (
                  <span className="error-message">{registerErrors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    id="register-confirm-password"
                    type={showRegisterConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    disabled={registerLoading}
                  />
                  <button
                    type="button"
                    className="eye-icon-btn"
                    onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                  >
                    {showRegisterConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <span className="error-message">{registerErrors.confirmPassword}</span>
                )}
              </div>

              {/* Security Questions */}
              <div className="security-section">
                <h3>Security Questions</h3>
                
                {/* Question 1 */}
                <div className="form-group">
                  <label htmlFor="security-q1">What is your favorite color?</label>
                  <input
                    id="security-q1"
                    type="text"
                    name="favoriteColor"
                    placeholder="Enter your answer"
                    value={registerData.favoriteColor}
                    onChange={handleRegisterChange}
                    className="security-input"
                    disabled={registerLoading}
                  />
                  {registerErrors.favoriteColor && (
                    <span className="error-message">{registerErrors.favoriteColor}</span>
                  )}
                </div>

                {/* Question 2 */}
                <div className="form-group">
                  <label htmlFor="security-q2">What is your nickname?</label>
                  <input
                    id="security-q2"
                    type="text"
                    name="nickName"
                    placeholder="Enter your answer"
                    value={registerData.nickName}
                    onChange={handleRegisterChange}
                    className="security-input"
                    disabled={registerLoading}
                  />
                  {registerErrors.nickName && (
                    <span className="error-message">{registerErrors.nickName}</span>
                  )}
                </div>

                {/* Question 3 */}
                <div className="form-group">
                  <label htmlFor="security-q3">What is your pet name?</label>
                  <input
                    id="security-q3"
                    type="text"
                    name="petName"
                    placeholder="Enter your answer"
                    value={registerData.petName}
                    onChange={handleRegisterChange}
                    className="security-input"
                    disabled={registerLoading}
                  />
                  {registerErrors.petName && (
                    <span className="error-message">{registerErrors.petName}</span>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <button 
                type="submit" 
                className="submit-btn"
                disabled={registerLoading}
              >
                {registerLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
```

## 4. Protected Routes

Create `src/Components/PrivateRoute/PrivateRoute.jsx`:

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
```

## 5. Update App.js

```javascript
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Dashboard from './Components/Dashboard/Dashboard';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import UserProfile from './Components/UserProfile/UserProfile';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import authService from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRegister onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={handleLogout} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <UserProfile user={user} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/change-password" 
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## 6. Install Required Dependencies

```bash
npm install axios
```

## 7. Start Both Applications

### Terminal 1 - React Frontend
```bash
cd login-register
npm start
```

### Terminal 2 - Spring Boot Backend
```bash
cd loginregister-backend
mvn spring-boot:run
```

## 8. Test the Integration

1. Open `http://localhost:3000` in your browser
2. Register a new user
3. Login with the registered credentials
4. Access protected routes

## 🔐 Token Storage

The JWT token is stored in `localStorage` as `authToken`. The token is automatically included in all API requests via the axios interceptor.

## 🚨 Important

- Never expose sensitive data in localStorage (client-side)
- Always validate tokens on the backend
- Implement token refresh mechanism for production
- Use httpOnly cookies in production (if possible)

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Check CORS configuration in SecurityConfig.java |
| Token not sent | Verify axios interceptor is configured |
| 401 Unauthorized | Check if token is expired or invalid |
| API not responding | Ensure Spring Boot backend is running |

---

Your React frontend is now fully integrated with the Spring Boot backend!
