import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (!token) {
      navigate('/');
      return;
    }
    
    setUsername(storedUsername || 'User');
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

  // Dashboard data
  const dashboardCards = [
    {
      title: 'Number of Sales',
      value: '2,456',
      percentage: '+12.5%',
      isPositive: true,
      icon: 'cart'
    },
    {
      title: 'Sales Revenue',
      value: '$45,678',
      percentage: '+8.2%',
      isPositive: true,
      icon: 'dollar'
    },
    {
      title: 'Average Price',
      value: '$18.60',
      percentage: '-3.1%',
      isPositive: false,
      icon: 'tag'
    },
    {
      title: 'Operations',
      value: '1,234',
      percentage: '+5.7%',
      isPositive: true,
      icon: 'activity'
    }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      
      <div className={`dashboard-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          username={username}
          onLogout={handleLogout}
        />
        
        <div className="dashboard-content">
          {/* Top Cards */}
          <div className="dashboard-cards">
            {dashboardCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Market Overview */}
            <div className="chart-card">
              <h3 className="chart-title">Market Overview</h3>
              <div className="bar-chart">
                <div className="bar-group">
                  <div className="bar-item">
                    <div className="bar activity" style={{ height: '70%' }}>
                      <span className="bar-value">70%</span>
                    </div>
                    <span className="bar-label">Activity</span>
                  </div>
                  <div className="bar-item">
                    <div className="bar goal" style={{ height: '85%' }}>
                      <span className="bar-value">85%</span>
                    </div>
                    <span className="bar-label">Goal</span>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color activity"></span>
                    <span>Activity</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color goal"></span>
                    <span>Goal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Overview */}
            <div className="chart-card">
              <h3 className="chart-title">Sales Overview</h3>
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
                <p className="progress-label">Sales Target Achieved</p>
              </div>
            </div>

            {/* Sales Analytics */}
            <div className="chart-card full-width">
              <h3 className="chart-title">Sales Analytics</h3>
              <div className="line-chart">
                <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <polyline
                    points="0,150 100,120 200,140 300,80 400,100 500,60 600,90"
                    fill="none"
                    stroke="#667eea"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="0" cy="150" r="5" fill="#667eea" />
                  <circle cx="100" cy="120" r="5" fill="#667eea" />
                  <circle cx="200" cy="140" r="5" fill="#667eea" />
                  <circle cx="300" cy="80" r="5" fill="#667eea" />
                  <circle cx="400" cy="100" r="5" fill="#667eea" />
                  <circle cx="500" cy="60" r="5" fill="#667eea" />
                  <circle cx="600" cy="90" r="5" fill="#667eea" />
                </svg>
                <div className="chart-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
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
                  <div className="activity-icon">📊</div>
                  <div className="activity-content">
                    <p className="activity-title">New report generated</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💰</div>
                  <div className="activity-content">
                    <p className="activity-title">Payment received</p>
                    <span className="activity-time">5 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-content">
                    <p className="activity-title">New user registered</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📈</div>
                  <div className="activity-content">
                    <p className="activity-title">Sales target achieved</p>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
