import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import { useUserProfile } from '../../hooks/useUserProfile';
import './Dashboard.css';

const DashboardWithAPI = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  // Get user profile data from backend
  const { profile, stats, posts, loading, error, createPost, refreshDashboard } = useUserProfile(userId);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    
    if (!token) {
      navigate('/');
      return;
    }
    
    setUsername(storedUsername || 'User');
    setUserId(storedUserId ? parseInt(storedUserId) : 1); // Default to user ID 1 for demo
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle creating a new post
  const handleCreatePost = async (content, postType) => {
    const result = await createPost({ content, postType });
    if (result.success) {
      alert('Post created successfully!');
    } else {
      alert('Failed to create post: ' + result.error);
    }
  };

  // Dashboard cards with real data from backend
  const dashboardCards = [
    {
      title: 'Total Posts',
      value: stats?.posts?.toString() || '0',
      percentage: '+12.5%',
      isPositive: true,
      icon: 'cart'
    },
    {
      title: 'Followers',
      value: stats?.followers?.toString() || '0',
      percentage: '+8.2%',
      isPositive: true,
      icon: 'dollar'
    },
    {
      title: 'Following',
      value: stats?.following?.toString() || '0',
      percentage: '+5.7%',
      isPositive: true,
      icon: 'tag'
    },
    {
      title: 'Profile Views',
      value: '1,234',
      percentage: '+15.3%',
      isPositive: true,
      icon: 'activity'
    }
  ];

  // Show loading state
  if (loading && !profile) {
    return (
      <div className="dashboard-layout">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <div className={`dashboard-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header username={username} onLogout={handleLogout} />
          <div className="dashboard-content">
            <div className="loading-message">
              <div className="spinner"></div>
              <p>Loading dashboard data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !profile) {
    return (
      <div className="dashboard-layout">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <div className={`dashboard-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header username={username} onLogout={handleLogout} />
          <div className="dashboard-content">
            <div className="error-message">
              <h3>⚠️ Unable to load dashboard</h3>
              <p>{error}</p>
              <button onClick={refreshDashboard} className="retry-button">
                Retry
              </button>
              <p className="error-hint">
                Make sure the backend is running at http://localhost:8080
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      
      <div className={`dashboard-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          username={profile?.fullName || username}
          onLogout={handleLogout}
        />
        
        <div className="dashboard-content">
          {/* User Profile Summary */}
          {profile && (
            <div className="profile-summary">
              <div className="profile-info">
                <div className="profile-avatar">
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt={profile.fullName} />
                  ) : (
                    <div className="avatar-placeholder">
                      {profile.fullName?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div className="profile-details">
                  <h2>{profile.fullName}</h2>
                  <p className="profile-role">{profile.role || 'User'}</p>
                  <p className="profile-email">{profile.email}</p>
                  {profile.location && <p className="profile-location">📍 {profile.location}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Top Cards with Real Data */}
          <div className="dashboard-cards">
            {dashboardCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          {/* Recent Posts */}
          {posts && posts.length > 0 && (
            <div className="posts-section">
              <div className="posts-card">
                <div className="posts-header">
                  <h3>Recent Posts</h3>
                  <span className="posts-count">{posts.length} posts</span>
                </div>
                <div className="posts-list">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.postId} className="post-item">
                      <div className="post-icon">
                        {post.postType === 'TEXT' && '📝'}
                        {post.postType === 'IMAGE' && '🖼️'}
                        {post.postType === 'VIDEO' && '🎥'}
                        {post.postType === 'ARTICLE' && '📄'}
                      </div>
                      <div className="post-content">
                        <p className="post-text">{post.content}</p>
                        <span className="post-time">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="charts-section">
            {/* Market Overview */}
            <div className="chart-card">
              <h3 className="chart-title">Activity Overview</h3>
              <div className="bar-chart">
                <div className="bar-group">
                  <div className="bar-item">
                    <div className="bar activity" style={{ height: `${(stats?.posts || 0) * 10}%` }}>
                      <span className="bar-value">{stats?.posts || 0}</span>
                    </div>
                    <span className="bar-label">Posts</span>
                  </div>
                  <div className="bar-item">
                    <div className="bar goal" style={{ height: `${(stats?.followers || 0) * 5}%` }}>
                      <span className="bar-value">{stats?.followers || 0}</span>
                    </div>
                    <span className="bar-label">Followers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Overview */}
            <div className="chart-card">
              <h3 className="chart-title">Engagement</h3>
              <div className="circular-progress">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#667eea" 
                    strokeWidth="20"
                    strokeDasharray="502.4"
                    strokeDashoffset="125.6"
                    transform="rotate(-90 100 100)"
                  />
                  <text x="100" y="100" textAnchor="middle" dy="7" fontSize="32" fontWeight="bold" fill="#2d3748">
                    75%
                  </text>
                </svg>
                <p className="progress-label">Profile Completion</p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-section">
            <div className="activity-card">
              <div className="activity-header">
                <h3>Recent Activity</h3>
                <span className="activity-date">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">✅</div>
                  <div className="activity-content">
                    <p className="activity-title">Connected to backend successfully</p>
                    <span className="activity-time">Just now</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-content">
                    <p className="activity-title">Profile loaded from database</p>
                    <span className="activity-time">Just now</span>
                  </div>
                </div>
                {posts.length > 0 && (
                  <div className="activity-item">
                    <div className="activity-icon">📝</div>
                    <div className="activity-content">
                      <p className="activity-title">Latest post: {posts[0].content.substring(0, 50)}...</p>
                      <span className="activity-time">
                        {new Date(posts[0].createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWithAPI;
