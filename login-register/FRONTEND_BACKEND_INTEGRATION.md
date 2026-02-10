# Frontend-Backend Integration Guide

## Overview
This guide explains how the React frontend connects to the Spring Boot backend API.

## Architecture

```
React Frontend (Port 3000)
    ↓
API Service Layer (src/services/api.js)
    ↓
Spring Boot Backend (Port 8080)
    ↓
Oracle Database
```

## Setup Steps

### 1. Install Dependencies (Already Done)
The project already has all necessary dependencies:
- `react-router-dom` - For routing
- `fetch API` - Built-in for HTTP requests

### 2. Configure Backend URL

Edit `.env` file in the frontend root:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Start Backend Server

```bash
cd loginregister-backend
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

### 4. Start Frontend Server

```bash
cd login-register
npm start
```

Frontend will run on: `http://localhost:3000`

## API Integration

### API Service Layer (`src/services/api.js`)

Centralized API calls with error handling:

```javascript
import { userProfileAPI, questionsAPI } from './services/api';

// Get user dashboard
const dashboard = await userProfileAPI.getDashboard(userId);

// Create a post
const post = await userProfileAPI.createPost(userId, {
  content: "Hello World",
  postType: "TEXT"
});

// Get all questions
const questions = await questionsAPI.getAllQuestions();
```

### Custom Hook (`src/hooks/useUserProfile.js`)

React hook for managing user data:

```javascript
import { useUserProfile } from './hooks/useUserProfile';

function MyComponent() {
  const { profile, stats, posts, loading, error } = useUserProfile(userId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{profile.fullName}</div>;
}
```

## Available API Endpoints

### User Profile APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/{userId}/profile` | Get user profile |
| GET | `/api/users/{userId}/stats` | Get user statistics |
| GET | `/api/users/{userId}/dashboard` | Get complete dashboard |
| PUT | `/api/users/{userId}/profile` | Update user profile |
| POST | `/api/users/{userId}/posts` | Create a new post |
| GET | `/api/users/{userId}/posts` | Get user posts |

### Questions & Answers APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/questions?userId={userId}` | Create question |
| GET | `/api/questions` | Get all questions |
| GET | `/api/questions/{questionId}` | Get question by ID |
| GET | `/api/questions/user/{userId}` | Get user's questions |
| GET | `/api/questions/search?keyword={keyword}` | Search questions |
| POST | `/api/questions/{questionId}/answers?userId={userId}` | Create answer |
| GET | `/api/questions/{questionId}/answers` | Get question answers |
| PUT | `/api/questions/{questionId}/answers/{answerId}/accept?userId={userId}` | Accept answer |
| POST | `/api/questions/{questionId}/vote?userId={userId}&voteType={1 or -1}` | Vote on question |
| POST | `/api/questions/answers/{answerId}/vote?userId={userId}&voteType={1 or -1}` | Vote on answer |

## Using the Dashboard

### Option 1: Dashboard with API Integration

Use `DashboardWithAPI` component for full backend integration:

```javascript
// In App.js
import DashboardWithAPI from './components/Dashboard/DashboardWithAPI';

<Route path="/dashboard" element={<DashboardWithAPI />} />
```

Features:
- ✅ Loads real user data from backend
- ✅ Displays user profile, stats, and posts
- ✅ Shows loading and error states
- ✅ Auto-refreshes data

### Option 2: Original Dashboard (Static)

Use original `Dashboard` component for static demo:

```javascript
// In App.js
import Dashboard from './components/Dashboard/Dashboard';

<Route path="/dashboard" element={<Dashboard />} />
```

## Testing the Integration

### 1. Check Backend is Running

```bash
curl http://localhost:8080/api/users/1/profile
```

Expected: JSON response or 404 (both mean backend is working)

### 2. Test from Browser Console

Open browser console on `http://localhost:3000` and run:

```javascript
fetch('http://localhost:8080/api/users/1/dashboard')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 3. Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to Dashboard
4. Look for API calls to `localhost:8080`

## Common Issues & Solutions

### Issue 1: CORS Error

**Error:** `Access to fetch at 'http://localhost:8080' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution:** Backend already has `@CrossOrigin(origins = "*")` on controllers. If issue persists, restart backend.

### Issue 2: Network Error

**Error:** `Network error. Please check if the backend is running.`

**Solution:**
1. Check backend is running: `curl http://localhost:8080/api/users/1/profile`
2. Verify URL in `.env` file
3. Check firewall settings

### Issue 3: 404 Not Found

**Error:** `User not found with id: 1`

**Solution:** This is normal if no data exists. Load sample data:
```bash
sqlplus userprofile_user/password@localhost:1521/ORCL @src/main/resources/db/sample-data.sql
```

### Issue 4: 500 Internal Server Error

**Error:** Database connection issues

**Solution:**
1. Check database is running
2. Verify credentials in `application.properties`
3. Check backend logs for detailed error

## Data Flow Example

### Loading Dashboard:

1. **User navigates to `/dashboard`**
   ```
   Browser → React Router → DashboardWithAPI component
   ```

2. **Component mounts, triggers useEffect**
   ```javascript
   useEffect(() => {
     fetchDashboard();
   }, [userId]);
   ```

3. **API call to backend**
   ```
   Frontend → fetch('http://localhost:8080/api/users/1/dashboard')
   ```

4. **Backend processes request**
   ```
   Controller → Service → Repository → Database
   ```

5. **Response flows back**
   ```
   Database → Repository → Service → Controller → JSON Response
   ```

6. **Frontend updates state**
   ```javascript
   setProfile(data.profile);
   setStats(data.stats);
   ```

7. **React re-renders with data**
   ```
   Component displays user profile, stats, and posts
   ```

## Authentication Flow (To Be Implemented)

Currently using localStorage for demo. For production:

1. **Login:**
   ```javascript
   const response = await fetch('/api/auth/login', {
     method: 'POST',
     body: JSON.stringify({ email, password })
   });
   const { token, userId } = await response.json();
   localStorage.setItem('token', token);
   localStorage.setItem('userId', userId);
   ```

2. **Authenticated Requests:**
   ```javascript
   fetch('/api/users/1/profile', {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });
   ```

## Development Workflow

### 1. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd loginregister-backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd login-register
npm start
```

### 2. Make Changes

- Frontend changes: Auto-reload (React hot reload)
- Backend changes: Restart backend server

### 3. Test Integration

1. Open `http://localhost:3000`
2. Login (use demo credentials)
3. Navigate to Dashboard
4. Check browser console for API calls
5. Verify data loads from backend

## Production Deployment

### Build Frontend

```bash
cd login-register
npm run build
```

This creates optimized production build in `build/` folder.

### Update API URL

For production, update `.env`:
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Deploy Options

1. **Separate Deployment:**
   - Frontend: Netlify, Vercel, AWS S3
   - Backend: AWS EC2, Heroku, DigitalOcean

2. **Combined Deployment:**
   - Serve React build from Spring Boot static resources
   - Single deployment package

## Monitoring & Debugging

### Frontend Debugging

```javascript
// Enable API logging
console.log('API Request:', endpoint, options);
console.log('API Response:', data);
```

### Backend Debugging

Check Spring Boot logs:
```bash
# In backend terminal
# Look for:
# - Incoming requests
# - SQL queries
# - Error stack traces
```

### Network Monitoring

Use browser DevTools:
1. Network tab - See all API calls
2. Console tab - See JavaScript errors
3. Application tab - Check localStorage

## Next Steps

1. ✅ Backend API is ready
2. ✅ Frontend API service created
3. ✅ Dashboard with API integration ready
4. ⏳ Implement authentication
5. ⏳ Add form validation
6. ⏳ Implement Questions & Answers UI
7. ⏳ Add error boundaries
8. ⏳ Implement loading skeletons

## Quick Reference

### Start Everything

```bash
# Terminal 1 - Backend
cd loginregister-backend && mvn spring-boot:run

# Terminal 2 - Frontend
cd login-register && npm start
```

### Test Connection

```bash
# Check backend
curl http://localhost:8080/api/users/1/profile

# Check frontend
open http://localhost:3000
```

### Common Commands

```bash
# Install frontend dependencies
npm install

# Build frontend
npm run build

# Run frontend tests
npm test

# Compile backend
mvn clean compile

# Run backend tests
mvn test
```
