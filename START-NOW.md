# ✅ READY TO CONNECT

## Everything is configured:

✅ CORS enabled (frontend ↔ backend)
✅ Database credentials set (sam20/Sam@pothe20)
✅ Backend built successfully
✅ Oracle service running

---

## 🚀 START NOW (2 steps):

### Step 1: Start Backend (Terminal 1)
```bash
cd loginregister-backend
RUN-BACKEND.bat
```

**Wait for:** `Started UserProfileApplication in X seconds`

If you see database connection errors:
- User sam20 might not exist in Oracle
- Quick fix: Switch to H2 (see SWITCH_TO_H2.md)

### Step 2: Start Frontend (Terminal 2)
```bash
cd login-register
RUN-FRONTEND.bat
```

Opens at: http://localhost:3000

---

## ✅ Test Connection

Once both are running:

1. Backend API: http://localhost:8080/api/users/1/dashboard
2. Frontend: http://localhost:3000

---

## 🔧 If Backend Fails to Start

The user `sam20` might not exist in your Oracle database.

**Option A: Create the user in Oracle**
```sql
sqlplus / as sysdba
CREATE USER sam20 IDENTIFIED BY "Sam@pothe20";
GRANT CONNECT, RESOURCE, DBA TO sam20;
EXIT;
```

**Option B: Use H2 (Recommended - No Oracle needed)**
```bash
cd loginregister-backend
# Follow SWITCH_TO_H2.md
```

---

## 📁 Files Created

- `loginregister-backend/RUN-BACKEND.bat` - Start backend
- `login-register/RUN-FRONTEND.bat` - Start frontend
- `loginregister-backend/config/WebConfig.java` - CORS config

---

**Run the backend now to test the connection!**
