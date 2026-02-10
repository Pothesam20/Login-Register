# Oracle Database Setup Guide for Windows

## Current Issue
```
ORA-12541: Cannot connect. No listener at host localhost port 1521
```

This means Oracle Database is either:
1. Not installed
2. Not running
3. Running on a different port
4. Listener is not started

## Solution Steps

### Step 1: Check if Oracle is Installed

Open Command Prompt and run:
```cmd
sqlplus /nolog
```

**If you see:**
- `SQL>` prompt → Oracle is installed ✅
- `'sqlplus' is not recognized` → Oracle is NOT installed ❌

### Step 2: Check Oracle Services (If Installed)

1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for these services:
   - `OracleServiceORCL` or `OracleServiceXE`
   - `OracleOraDB19Home1TNSListener` or similar

**Check Status:**
- If **Running** → Good! Go to Step 3
- If **Stopped** → Right-click → Start
- If **Not Found** → Oracle might not be installed correctly

### Step 3: Start Oracle Services

**Option A: Using Services (GUI)**
1. Open `services.msc`
2. Find `OracleServiceORCL` (or `OracleServiceXE`)
3. Right-click → Start
4. Find `OracleOraDB...TNSListener`
5. Right-click → Start

**Option B: Using Command Prompt (Run as Administrator)**
```cmd
net start OracleServiceORCL
net start OracleOraDB19Home1TNSListener
```

For Oracle XE:
```cmd
net start OracleServiceXE
net start OracleXETNSListener
```

### Step 4: Check Listener Status

```cmd
lsnrctl status
```

**Expected Output:**
```
Services Summary...
Service "ORCL" has 1 instance(s).
  Instance "ORCL", status READY, has 1 handler(s) for this service...
```

**If listener is not running:**
```cmd
lsnrctl start
```

### Step 5: Find Your Oracle SID

Your Oracle database might be using a different SID. Check with:

```cmd
lsnrctl status
```

Look for the service name (e.g., `ORCL`, `XE`, `ORCLPDB`).

### Step 6: Test Connection with SQL*Plus

```cmd
sqlplus system/your_password@localhost:1521/ORCL
```

Replace:
- `your_password` with your SYSTEM password
- `ORCL` with your actual SID (might be `XE`)

**If successful, you'll see:**
```
Connected to:
Oracle Database 19c Enterprise Edition
```

### Step 7: Update application.properties

Based on what you found, update `src/main/resources/application.properties`:

**For Oracle Standard (ORCL):**
```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:ORCL
spring.datasource.username=system
spring.datasource.password=your_password
```

**For Oracle XE:**
```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
spring.datasource.username=system
spring.datasource.password=your_password
```

**For Oracle with PDB (Pluggable Database):**
```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/ORCLPDB
spring.datasource.username=system
spring.datasource.password=your_password
```

### Step 8: Create Database User

Once connected with SQL*Plus:

```sql
-- Connect as SYSTEM
sqlplus system/your_password@localhost:1521/ORCL

-- Create user
CREATE USER userprofile_user IDENTIFIED BY StrongPassword123;

-- Grant privileges
GRANT CONNECT, RESOURCE TO userprofile_user;
GRANT CREATE SESSION TO userprofile_user;
GRANT CREATE TABLE TO userprofile_user;
GRANT CREATE SEQUENCE TO userprofile_user;
GRANT UNLIMITED TABLESPACE TO userprofile_user;

-- Verify user created
SELECT username FROM dba_users WHERE username = 'USERPROFILE_USER';

-- Exit
EXIT;
```

### Step 9: Update application.properties with New User

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:ORCL
spring.datasource.username=userprofile_user
spring.datasource.password=StrongPassword123
```

### Step 10: Create Database Tables

```cmd
sqlplus userprofile_user/StrongPassword123@localhost:1521/ORCL
```

Then run:
```sql
@C:\path\to\loginregister-backend\src\main\resources\db\schema.sql
@C:\path\to\loginregister-backend\src\main\resources\db\questions-answers-schema.sql
```

Or copy-paste the SQL content directly.

### Step 11: Test Backend Connection

```cmd
cd loginregister-backend
java -jar target\user-profile-backend-1.0.0.jar
```

**Look for:**
```
HikariPool-1 - Start completed.
Started UserProfileApplication in X.XXX seconds
```

## If Oracle is NOT Installed

### Option 1: Install Oracle Database XE (Free)

1. **Download Oracle XE:**
   - Go to: https://www.oracle.com/database/technologies/xe-downloads.html
   - Download Oracle Database 21c Express Edition for Windows
   - File size: ~2.5 GB

2. **Install:**
   - Run the installer
   - Set a password for SYS and SYSTEM users (remember this!)
   - Default port: 1521
   - Default SID: XE

3. **After Installation:**
   - Services will start automatically
   - Use SID: `XE`
   - Connection: `localhost:1521/XE`

### Option 2: Use H2 Database (In-Memory, No Installation)

If you don't want to install Oracle, use H2 database for development:

**Update pom.xml:**
```xml
<!-- Comment out Oracle -->
<!--
<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc8</artifactId>
    <scope>runtime</scope>
</dependency>
-->

<!-- Add H2 -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

**Update application.properties:**
```properties
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (optional)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
```

**Advantages of H2:**
- ✅ No installation required
- ✅ Starts instantly
- ✅ Perfect for development
- ✅ Web console at http://localhost:8080/api/h2-console
- ❌ Data is lost when app stops (in-memory)

### Option 3: Use Docker Oracle (Advanced)

```cmd
docker pull container-registry.oracle.com/database/express:latest
docker run -d -p 1521:1521 -e ORACLE_PWD=YourPassword123 container-registry.oracle.com/database/express:latest
```

## Common Issues & Solutions

### Issue 1: "TNS: no listener"
**Solution:** Start the listener
```cmd
lsnrctl start
```

### Issue 2: "ORA-01017: invalid username/password"
**Solution:** 
- Check password is correct
- Try connecting as SYSTEM first
- Reset password if needed

### Issue 3: "ORA-12505: TNS:listener does not currently know of SID"
**Solution:** Wrong SID. Try:
- `ORCL` → `XE`
- `ORCL` → `ORCLPDB`
- Check with `lsnrctl status`

### Issue 4: Port 1521 already in use
**Solution:** Find which port Oracle is using:
```cmd
netstat -ano | findstr :1521
```

### Issue 5: Oracle service won't start
**Solution:**
1. Check Windows Event Viewer for errors
2. Restart computer
3. Reinstall Oracle

## Quick Test Commands

```cmd
REM Check if Oracle is listening
telnet localhost 1521

REM Check Oracle services
sc query OracleServiceORCL

REM Check listener
lsnrctl status

REM Test connection
sqlplus system/password@localhost:1521/ORCL

REM Check if port is open
netstat -ano | findstr :1521
```

## Recommended: Use H2 for Development

For quick development without Oracle hassle:

1. **Update pom.xml** (add H2 dependency)
2. **Update application.properties** (use H2 config)
3. **Restart backend**
4. **Access H2 Console:** http://localhost:8080/api/h2-console
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: (leave empty)

## Next Steps After Database is Connected

1. ✅ Backend starts without errors
2. ✅ Create database tables (run schema.sql)
3. ✅ Load sample data (optional)
4. ✅ Test API endpoints
5. ✅ Start frontend
6. ✅ Test full integration

## Need Help?

Check these files:
- `DATABASE_CONNECTION_TEST.md` - Connection testing
- `QUICK_CONNECTION_CHECK.md` - Quick troubleshooting
- `SETUP_GUIDE.md` - Complete setup guide
