import { useNavigate } from 'react-router-dom';
import './SecurityCard.css';

const SecurityCard = ({ security }) => {
  const navigate = useNavigate();

  return (
    <div className="security-card">
      <h3 className="card-title">Security Settings</h3>
      <div className="security-info">
        <div className="security-item">
          <label className="security-label">Username</label>
          <p className="security-value">{security.username}</p>
        </div>
        <div className="security-item">
          <label className="security-label">Last Login</label>
          <p className="security-value">{security.lastLogin}</p>
        </div>
        <div className="security-item">
          <label className="security-label">Account Status</label>
          <p className="security-value">
            <span className="status-badge active">{security.accountStatus}</span>
          </p>
        </div>
      </div>
      <div className="security-actions">
        <button 
          className="security-btn primary"
          onClick={() => navigate('/change-password')}
        >
          Change Password
        </button>
        <button className="security-btn secondary">
          Enable 2FA
        </button>
      </div>
    </div>
  );
};

export default SecurityCard;
