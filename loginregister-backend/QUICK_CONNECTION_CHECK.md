# Quick Connection Check - 3 Simple Steps

## Step 1: Update Database Credentials (2 minutes)

Edit `src/main/resources/application.properties`:

```properties
# Change these 3 lines:
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:ORCL
spring.datasource.username=userprofile_user
spring.datasource.password=YOUR_PASSWORD_HERE
```

**Common URLs:**
- Oracle XE: `jdbc:oracle:thin:@localhost:1521:XE`
- Oracle Standard: `jdbc:oracle:thin:@localhost:1521:ORCL`

## Step 2: Run Connection Test (30 seconds)

**Windows:**
```bash
cd loginregister-backend
check-connection.bat
```

**Linux/Mac:**
```bash
cd loginregister-backend
chmod +x check-connection.sh
./check-connection.sh
```

## Step 3: Check Results

### ✅ SUCCESS - You'll see:
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
...
Started UserProfileApplication in X.XXX seconds
```

**What this means:** Database is connected! Backend is ready!

### ❌ FAILED - Common Errors:

**Error 1: "ORA-01017: invalid username/password"**
```
Fix: Update username/password in application.properties
```

**Error 2: "IO Error: The Network Adapter could not establish the connection"**
```
Fix: Start Oracle database service
     Windows: services.msc → Find Oracle service → Start
     Linux: sudo systemctl start oracle
```

**Error 3: "ORA-12505: TNS:listener does not currently know of SID"**
```
Fix: Change ORCL to XE in the URL (or vice versa)
     jdbc:oracle:thin:@localhost:1521:XE
```

## Alternative: Manual Test

If scripts don't work, test manually:

```bash
cd loginregister-backend

# 1. Compile
mvn clean compile

# 2. Run
mvn spring-boot:run

# 3. Watch the logs for:
#    ✅ "HikariPool-1 - Start completed"
#    ✅ "Started UserProfileApplication"
```

## Quick Database Setup (If Needed)

If you haven't set up the database yet:

```sql
-- 1. Connect as SYSTEM
sqlplus system/password@localhost:1521/ORCL

-- 2. Create user
CREATE USER userprofile_user IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE, UNLIMITED TABLESPACE TO userprofile_user;

-- 3. Connect as new user
CONNECT userprofile_user/your_password@localhost:1521/ORCL;

-- 4. Run schema
@C:/path/to/loginregister-backend/src/main/resources/db/schema.sql
@C:/path/to/loginregister-backend/src/main/resources/db/questions-answers-schema.sql
```

## Test API After Connection

Once backend starts successfully:

```bash
# Test 1: Get user profile (will return 404 if no data, but proves connection works)
curl http://localhost:8080/api/users/1/profile

# Test 2: Get all questions
curl http://localhost:8080/api/questions
```

**Expected Results:**
- `404 Not Found` = Database connected, no data yet (GOOD!)
- `200 OK` = Database connected with data (PERFECT!)
- `500 Error` or timeout = Database NOT connected (CHECK CONFIG!)

## Troubleshooting Checklist

- [ ] Oracle database is running
- [ ] Correct username in application.properties
- [ ] Correct password in application.properties
- [ ] Correct URL (check SID: ORCL or XE)
- [ ] User has CONNECT and RESOURCE privileges
- [ ] Schema scripts have been run
- [ ] Port 1521 is not blocked by firewall

## Need More Help?

See detailed guides:
- `DATABASE_CONNECTION_TEST.md` - Complete troubleshooting guide
- `SETUP_GUIDE.md` - Full setup instructions
- `START_HERE.md` - Getting started guide

## Quick Commands Reference

```bash
# Check Oracle listener status
lsnrctl status

# Connect to Oracle
sqlplus username/password@localhost:1521/ORCL

# List tables
SELECT table_name FROM user_tables;

# Check if backend is running
curl http://localhost:8080/api/users/1/profile

# Stop backend
Ctrl + C
```
