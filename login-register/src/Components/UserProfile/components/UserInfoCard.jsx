import './UserInfoCard.css';

const UserInfoCard = ({ info }) => {
  return (
    <div className="user-info-card">
      <h3 className="card-title">User Information</h3>
      <div className="info-grid">
        <div className="info-item">
          <label className="info-label">Full Name</label>
          <p className="info-value">{info.fullName}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Email</label>
          <p className="info-value">{info.email}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Phone</label>
          <p className="info-value">{info.phone}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Mobile</label>
          <p className="info-value">{info.mobile}</p>
        </div>
        <div className="info-item full-width">
          <label className="info-label">Address</label>
          <p className="info-value">{info.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
