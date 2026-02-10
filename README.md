# User Profile Dashboard - Full Stack Application

React frontend + Spring Boot backend + Oracle/H2 database

## 🚀 Quick Start

**NEW USER? START HERE:** See `START_HERE.md` for complete setup guide!

### 1. Choose Database

**Option A: H2 (Easiest - No installation)** ⚡ RECOMMENDED
- See: `loginregister-backend/SWITCH_TO_H2.md`
- Time: 5 minutes
- No download needed

**Option B: Oracle Database** 🗄️
- Download: See `loginregister-backend/ORACLE_DOWNLOAD_LINKS.md`
- Setup: See `loginregister-backend/ORACLE_DOWNLOAD_SETUP.md`
- Time: 30-60 minutes

### 2. Start Backend

```bash
cd loginregister-backend
mvn clean package -DskipTests
java -jar target/user-profile-backend-1.0.0.jar
```

Wait for: `Started UserProfileApplication`

### 3. Start Frontend

```bash
cd login-register
npm install  # First time only
npm start
```

Opens at: http://localhost:3000

## Project Structure

```
├── loginregister-backend/     # Spring Boot API (Port 8080)
│   ├── src/main/java/         # Java source code
│   └── src/main/resources/    # Configuration & SQL scripts
│
├── login-register/            # React Frontend (Port 3000)
│   ├── src/components/        # React components
│   ├── src/services/          # API integration
│   └── src/hooks/             # Custom hooks
│
└── Documentation files
```

## API Endpoints

**User Profile:**
- GET `/api/users/{id}/dashboard` - Get user dashboard
- PUT `/api/users/{id}/profile` - Update profile
- POST `/api/users/{id}/posts` - Create post

**Questions & Answers:**
- GET `/api/questions` - Get all questions
- POST `/api/questions?userId={id}` - Create question
- POST `/api/questions/{id}/answers?userId={id}` - Create answer

See: `loginregister-backend/README.md` for complete API docs

## Documentation

- **`QUICK_START.md`** - Complete setup guide
- **`DATABASE_OPTIONS.md`** - Database setup options
- **`loginregister-backend/SWITCH_TO_H2.md`** - H2 database setup
- **`loginregister-backend/DATABASE_SETUP_WINDOWS.md`** - Oracle setup
- **`loginregister-backend/README.md`** - API documentation
- **`loginregister-backend/QUESTIONS_ANSWERS_API.md`** - Q&A API docs
- **`login-register/FRONTEND_BACKEND_INTEGRATION.md`** - Integration guide

## Troubleshooting

**Backend won't start:**
- Check database connection
- Run: `loginregister-backend/check-oracle.bat`
- Or switch to H2 database

**Frontend can't connect:**
- Verify backend is running on port 8080
- Check `.env` file: `REACT_APP_API_URL=http://localhost:8080/api`

**Database errors:**
- See: `DATABASE_OPTIONS.md`
- Quick fix: Use H2 database (no installation needed)

## Tech Stack

- **Frontend:** React 19, React Router
- **Backend:** Spring Boot 3.2, Java 21+
- **Database:** Oracle / H2
- **Build:** Maven, npm

## Features

✅ User profile management  
✅ User statistics dashboard  
✅ Post creation and viewing  
✅ Questions & Answers system  
✅ REST API with 17 endpoints  
✅ Frontend-backend integration  
✅ Loading and error states  

## Notes

- Lombok has been removed for Java 25 compatibility
- Backend works with both Oracle and H2 databases
- Frontend can work with or without backend (static mode)
- All documentation is in markdown files
