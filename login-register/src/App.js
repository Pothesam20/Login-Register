import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Dashboard from './Components/Dashboard/Dashboard';
import DashboardWithAPI from './Components/Dashboard/DashboardWithAPI';
import UserProfile from './Components/UserProfile/UserProfile';
import './App.css';

function App() {
  // Use DashboardWithAPI for backend integration
  // Use Dashboard for static demo without backend
  const USE_BACKEND = process.env.REACT_APP_USE_BACKEND !== 'false';
  const DashboardComponent = USE_BACKEND ? DashboardWithAPI : Dashboard;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
