import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ChangePassword from './components/ChangePassword/ChangePassword';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardWithAPI from './components/Dashboard/DashboardWithAPI';
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
      </Routes>
    </Router>
  );
}

export default App;
