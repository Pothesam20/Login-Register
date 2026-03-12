import { useNavigate } from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import UserInfoCard from './components/UserInfoCard';
import SecurityCard from './components/SecurityCard';
import SkillCard from './components/SkillCard';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();

  // Dummy user data
  const userData = {
    name: 'John Doe',
    description: 'Full Stack Developer | Tech Enthusiast | Coffee Lover',
    profileImage: 'https://via.placeholder.com/150',
    socialLinks: {
      website: 'https://johndoe.com',
      twitter: 'https://twitter.com/johndoe',
      facebook: 'https://facebook.com/johndoe',
      instagram: 'https://instagram.com/johndoe'
    },
    info: {
      fullName: 'John Michael Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      mobile: '+1 (555) 987-6543',
      address: '123 Main Street, New York, NY 10001, USA'
    },
    security: {
      username: 'johndoe123',
      lastLogin: '2024-02-11 10:30 AM',
      accountStatus: 'Active'
    },
    skills: {
      technical: [
        { name: 'React.js', percentage: 90 },
        { name: 'Node.js', percentage: 85 },
        { name: 'JavaScript', percentage: 95 },
        { name: 'Python', percentage: 80 },
        { name: 'SQL', percentage: 75 }
      ],
      professional: [
        { name: 'Communication', percentage: 88 },
        { name: 'Team Work', percentage: 92 },
        { name: 'Problem Solving', percentage: 87 },
        { name: 'Time Management', percentage: 85 },
        { name: 'Leadership', percentage: 78 }
      ]
    }
  };

  return (
    <div className="user-profile-container">
      {/* Top Navigation Buttons */}
      <div className="profile-top-nav">
        <h1 className="profile-page-title">User Profile</h1>
        <div className="profile-nav-buttons">
          <button 
            className="nav-btn dashboard-btn"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
          <button 
            className="nav-btn login-btn"
            onClick={() => navigate('/')}
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Left Side */}
        <div className="profile-left">
          <ProfileCard 
            name={userData.name}
            description={userData.description}
            profileImage={userData.profileImage}
            socialLinks={userData.socialLinks}
          />
        </div>

        {/* Right Side */}
        <div className="profile-right">
          <UserInfoCard info={userData.info} />
          <SecurityCard security={userData.security} />
          <div className="skills-section">
            <SkillCard 
              title="Technical Skills"
              skills={userData.skills.technical}
            />
            <SkillCard 
              title="Professional Skills"
              skills={userData.skills.professional}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
