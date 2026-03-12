import './ProfileCard.css';

const ProfileCard = ({ name, description, profileImage, socialLinks }) => {
  return (
    <div className="profile-card-wrapper">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={profileImage} alt={name} className="profile-image" />
        </div>
        <h2 className="profile-name">{name}</h2>
        <p className="profile-description">{description}</p>
        <div className="profile-actions">
          <button className="btn-follow">Follow</button>
          <button className="btn-message">Message</button>
        </div>
      </div>

      {/* Social Links Card */}
      <div className="social-links-card">
        <h3 className="card-title">Social Links</h3>
        <div className="social-links">
          <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>Website</span>
          </a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
            <span>Twitter</span>
          </a>
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            <span>Facebook</span>
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
