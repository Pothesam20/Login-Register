# Essential Files Guide

## 📁 Documentation (Keep These)

### Root Level
- **`README.md`** - Main project overview (START HERE)
- **`QUICK_START.md`** - Step-by-step setup guide
- **`DATABASE_OPTIONS.md`** - Choose your database

### Backend Documentation
- **`loginregister-backend/README.md`** - API documentation
- **`loginregister-backend/QUESTIONS_ANSWERS_API.md`** - Q&A API docs
- **`loginregister-backend/SWITCH_TO_H2.md`** - H2 database setup (easiest)
- **`loginregister-backend/DATABASE_SETUP_WINDOWS.md`** - Oracle setup
- **`loginregister-backend/LOMBOK_REMOVED.md`** - Java 25 fix notes
- **`loginregister-backend/QUICK_CONNECTION_CHECK.md`** - Quick troubleshooting

### Frontend Documentation
- **`login-register/FRONTEND_BACKEND_INTEGRATION.md`** - Integration guide

## 🛠️ Helper Scripts (Keep These)

- **`loginregister-backend/check-oracle.bat`** - Check Oracle status
- **`loginregister-backend/check-connection.bat`** - Test backend connection
- **`loginregister-backend/check-connection.sh`** - Test backend (Linux/Mac)

## 🗄️ Database Files (Keep These)

- **`loginregister-backend/setup-database-user.sql`** - Create Oracle user
- **`loginregister-backend/src/main/resources/db/schema.sql`** - User profile tables
- **`loginregister-backend/src/main/resources/db/questions-answers-schema.sql`** - Q&A tables
- **`loginregister-backend/src/main/resources/db/sample-data.sql`** - Sample user data
- **`loginregister-backend/src/main/resources/db/questions-answers-sample-data.sql`** - Sample Q&A data

## 🚀 Quick Reference

### To Start:
1. Read: `README.md`
2. Follow: `QUICK_START.md`
3. Choose database: `DATABASE_OPTIONS.md`

### For Database:
- **H2 (Easy):** `loginregister-backend/SWITCH_TO_H2.md`
- **Oracle:** `loginregister-backend/DATABASE_SETUP_WINDOWS.md`

### For APIs:
- **User Profile:** `loginregister-backend/README.md`
- **Q&A System:** `loginregister-backend/QUESTIONS_ANSWERS_API.md`

### For Integration:
- **Frontend-Backend:** `login-register/FRONTEND_BACKEND_INTEGRATION.md`

## 🗑️ Removed Files

These were removed as duplicates or unnecessary:
- ❌ START_HERE.md (merged into README.md)
- ❌ INTEGRATION_COMPLETE.md (merged into QUICK_START.md)
- ❌ LOMBOK_FIX.md (issue already fixed)
- ❌ DATABASE_CONNECTION_TEST.md (merged into QUICK_CONNECTION_CHECK.md)
- ❌ SETUP_GUIDE.md (merged into DATABASE_SETUP_WINDOWS.md)
- ❌ RUN_AND_TEST.md (info in README.md)
- ❌ start-all scripts (not essential)
- ❌ test-connection scripts (duplicate of check-connection)
- ❌ run-tests scripts (not needed for basic setup)

## 📊 File Count

**Before cleanup:** ~25 documentation files  
**After cleanup:** 10 essential documentation files  

Much cleaner! 🎉
