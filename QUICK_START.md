# Quick Start Guide - Full Stack Application

## Prerequisites
- ✅ Java 21 or higher installed
- ✅ Node.js 14+ and npm installed
- ✅ Oracle Database running
- ✅ Maven installed

## Step 1: Start Backend (5 minutes)

### 1.1 Configure Database
Edit `loginregister-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:ORCL
spring.datasource.username=userprofile_user
spring.datasource.password=your_password
```

### 1.2 Set Up Database (First Time Only)
```bash
# Connect to Oracle as SYSTEM
sqlplus system/password@localhost:1521/ORCL

# Run setup script
@loginregister-backend/setup-database-user.sql

# Connect as new user
CONNECT userprofile_user/your_password@localhost:1521/ORCL;

# Create tables
@loginregister-backend/src/main/resources/db/schema.sql
@loginregister-backend/src/main/resources/db/questions-answers-schema.sql

# Load sample data (optional)
@loginregister-backend/src/main/resources/db/sample-data.sql
@loginregister-backend/src/main/resources/db/questions-answers-sample-data.sql
```

### 1.3 Start Backend Server
```bash
cd loginregister-backend
mvn spring-boot:run
```

**Wait for:** `Started UserProfileApplication in X.XXX seconds`

Backend will be available at: `http://localhost:8080`

## Step 2: Start Frontend (2 minutes)

### 2.1 Install Dependencies (First Time Only)
```bash
cd login-register
npm install
```

### 2.2 Configure Backend URL
File `.env` is already configured:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_USE_BACKEND=true
```

### 2.3 Start Frontend Server
```bash
npm start
```

Frontend will open automatically at: `http://localhost:3000`

## Step 3: Test the Application

### 3.1 Test Backend Connection
Open a new terminal:
```bash
curl http://localhost:8080/api/users/1/profile
```

**Expected:**
- `404 Not Found` = Backend working, no data yet ✅
- `200 OK` with JSON = Backend working with data ✅
- Connection error = Backend not running ❌

### 3.2 Test Frontend
1. Open browser: `http://localhost:3000`
2. Login with demo credentials:
   - Email: `demo@example.com`
   - Password: `password`
3. Navigate to Dashboard
4. Check if data loads from backend

### 3.3 Verify Integration
Open browser DevTools (F12):
1. Go to **Network** tab
2. Navigate to Dashboard
3. Look for API calls to `localhost:8080`
4. Check **Console** tab for any errors

## Quick Commands Reference

### Backend Commands
```bash
# Start backend
cd loginregister-backend && mvn spring-boot:run

# Check connection
cd loginregister-backend && check-connection.bat  # Windows
cd loginregister-backend && ./check-connection.sh  # Linux/Mac

# Run tests
mvn test

# Build
mvn clean install
```

### Frontend Commands
```bash
# Start frontend
cd login-register && npm start

# Build for production
npm run build

# Run tests
npm test
```

### Database Commands
```bash
# Connect to Oracle
sqlplus userprofile_user/password@localhost:1521/ORCL

# List tables
SELECT table_name FROM user_tables;

# Check data
SELECT * FROM USER_PROFILE;
SELECT * FROM USER_STATS;
```

## Troubleshooting

### Backend Won't Start

**Issue:** Lombok errors
**Solution:** Already fixed! Lombok has been removed.

**Issue:** Database connection failed
**Solution:** 
1. Check Oracle is running
2. Verify credentials in `application.properties`
3. Run: `cd loginregister-backend && check-connection.bat`

### Frontend Won't Connect

**Issue:** CORS error
**Solution:** Backend already has CORS enabled. Restart backend.

**Issue:** Network error
**Solution:**
1. Verify backend is running: `curl http://localhost:8080/api/users/1/profile`
2. Check `.env` file has correct URL
3. Restart both servers

### No Data Showing

**Issue:** 404 errors in dashboard
**Solution:** Load sample data:
```bash
sqlplus userprofile_user/password@localhost:1521/ORCL @loginregister-backend/src/main/resources/db/sample-data.sql
```

## Project Structure

```
LOGIN-REGISTER/
├── loginregister-backend/          # Spring Boot Backend
│   ├── src/main/java/              # Java source code
│   │   └── com/userprofile/
│   │       ├── controller/         # REST Controllers
│   │       ├── service/            # Business Logic
│   │       ├── repository/         # Data Access
│   │       ├── entity/             # Database Entities
│   │       └── dto/                # Data Transfer Objects
│   ├── src/main/resources/
│   │   ├── application.properties  # Configuration
│   │   └── db/                     # SQL Scripts
│   └── pom.xml                     # Maven dependencies
│
├── login-register/                 # React Frontend
│   ├── src/
│   │   ├── components/             # React Components
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Dashboard/
│   │   │   └── ...
│   │   ├── services/               # API Service Layer
│   │   │   └── api.js              # Backend API calls
│   │   ├── hooks/                  # Custom React Hooks
│   │   │   └── useUserProfile.js
│   │   └── App.js                  # Main App Component
│   ├── .env                        # Environment Variables
│   └── package.json                # npm dependencies
│
└── QUICK_START.md                  # This file
```

## API Endpoints Available

### User Profile
- `GET /api/users/{userId}/profile` - Get user profile
- `GET /api/users/{userId}/stats` - Get user statistics
- `GET /api/users/{userId}/dashboard` - Get complete dashboard
- `PUT /api/users/{userId}/profile` - Update profile
- `POST /api/users/{userId}/posts` - Create post
- `GET /api/users/{userId}/posts` - Get user posts

### Questions & Answers
- `GET /api/questions` - Get all questions
- `POST /api/questions?userId={userId}` - Create question
- `GET /api/questions/{id}` - Get question by ID
- `POST /api/questions/{id}/answers?userId={userId}` - Create answer
- `GET /api/questions/{id}/answers` - Get answers
- And more... (see QUESTIONS_ANSWERS_API.md)

## Development Workflow

### Daily Development
1. Start backend: `cd loginregister-backend && mvn spring-boot:run`
2. Start frontend: `cd login-register && npm start`
3. Make changes
4. Test in browser: `http://localhost:3000`

### Making Backend Changes
1. Edit Java files
2. Stop backend (Ctrl+C)
3. Restart: `mvn spring-boot:run`

### Making Frontend Changes
1. Edit React files
2. Changes auto-reload (no restart needed)

## Next Steps

1. ✅ Backend is running
2. ✅ Frontend is running
3. ✅ Integration is working
4. ⏳ Implement authentication
5. ⏳ Add more features
6. ⏳ Deploy to production

## Documentation

- **Backend Setup:** `loginregister-backend/START_HERE.md`
- **Database Setup:** `loginregister-backend/SETUP_GUIDE.md`
- **API Documentation:** `loginregister-backend/README.md`
- **Q&A API:** `loginregister-backend/QUESTIONS_ANSWERS_API.md`
- **Frontend Integration:** `login-register/FRONTEND_BACKEND_INTEGRATION.md`
- **Connection Test:** `loginregister-backend/QUICK_CONNECTION_CHECK.md`

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the detailed documentation
3. Check backend logs for errors
4. Check browser console for frontend errors
5. Verify both servers are running

## Success Checklist

- [ ] Oracle database is running
- [ ] Database user created
- [ ] Schema scripts executed
- [ ] Backend starts without errors
- [ ] Backend responds to API calls
- [ ] Frontend starts without errors
- [ ] Frontend connects to backend
- [ ] Dashboard loads user data
- [ ] No CORS errors in browser console

When all items are checked, your full-stack application is ready! 🎉
