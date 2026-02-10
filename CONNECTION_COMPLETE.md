# 🚀 Complete Connection Guide

## ✅ What I've Set Up

1. **CORS Configuration** - Backend can now accept requests from frontend
2. **Database Connection** - Using your Oracle credentials (sam20/Sam@pothe20)
3. **Startup Scripts** - Easy one-click startup for both servers

---

## 📋 Step-by-Step Instructions

### Step 1: Test Database Connection (Optional)

```bash
cd loginregister-backend
test-db-connection.bat
```

If this fails, Oracle isn't running. Start it with:
- Services → OracleServiceORCL → Start
- Or switch to H2 database (see SWITCH_TO_H2.md)

### Step 2: Start Backend Server

**Option A: Using script (Recommended)**
```bash
cd loginregister-backend
start-backend.bat
```

**Option B: Manual**
```bash
cd loginregister-backend
mvn clean package -DskipTests
java -jar target/user-profile-backend-1.0.0.jar
```

**Wait for:** `Started UserProfileApplication` message

Backend will run on: **http://localhost:8080/api**

### Step 3: Start Frontend (New Terminal)

**Option A: Using script (Recommended)**
```bash
cd login-register
start-frontend.bat
```

**Option B: Manual**
```bash
cd login-register
npm install  # First time only
npm start
```

Frontend will open at: **http://localhost:3000**

---

## 🔍 Verify Connection

1. Backend running: http://localhost:8080/api/users/1/dashboard
2. Frontend running: http://localhost:3000
3. Check browser console for any errors

---

## ⚙️ Configuration Files

### Backend (application.properties)
```properties
server.port=8080
server.servlet.context-path=/api
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:ORCL
spring.datasource.username=sam20
spring.datasource.password=Sam@pothe20
```

### Frontend (.env)
```properties
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_USE_BACKEND=true
```

### CORS (WebConfig.java) ✅ NEW
- Allows frontend (port 3000) to call backend (port 8080)
- Supports all HTTP methods (GET, POST, PUT, DELETE)

---

## 🐛 Troubleshooting

### Backend won't start
- **Database error**: Oracle not running or wrong credentials
  - Fix: Start Oracle service or switch to H2
- **Port 8080 in use**: Another app using the port
  - Fix: Stop other app or change port in application.properties

### Frontend can't connect to backend
- **CORS error**: Backend not running or wrong URL
  - Fix: Ensure backend is running on port 8080
- **Network error**: Backend crashed or not responding
  - Fix: Check backend terminal for errors

### Database connection failed
- **Oracle not running**: Service stopped
  - Fix: Start OracleServiceORCL in Windows Services
- **Wrong credentials**: Username/password incorrect
  - Fix: Update application.properties
- **Quick solution**: Switch to H2 (no installation needed)
  - See: loginregister-backend/SWITCH_TO_H2.md

---

## 📊 Test the Connection

Once both servers are running, test these endpoints:

1. **Get User Dashboard**
   ```
   GET http://localhost:8080/api/users/1/dashboard
   ```

2. **Get All Questions**
   ```
   GET http://localhost:8080/api/questions
   ```

3. **Frontend Dashboard**
   ```
   http://localhost:3000
   ```

---

## 🎯 Quick Commands

```bash
# Terminal 1 - Backend
cd loginregister-backend
start-backend.bat

# Terminal 2 - Frontend
cd login-register
start-frontend.bat
```

That's it! Both servers should now be connected and working together.
