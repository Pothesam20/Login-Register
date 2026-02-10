# Oracle Database Download & Setup Guide

## Step-by-Step Guide to Download and Install Oracle Database XE

### Step 1: Download Oracle Database XE (Free Edition)

1. **Go to Oracle Website:**
   - Visit: https://www.oracle.com/database/technologies/xe-downloads.html
   - Or search: "Oracle Database XE download"

2. **Choose Version:**
   - **Oracle Database 21c Express Edition** (Recommended)
   - For Windows x64
   - File size: ~2.5 GB
   - **Note:** You need to create a free Oracle account to download

3. **Create Oracle Account (if needed):**
   - Click "Download" button
   - Sign in or create free account
   - Accept license agreement
   - Download will start

4. **Downloaded File:**
   - `OracleXE213_Win64.zip` (or similar)
   - Extract the ZIP file

### Step 2: Install Oracle Database XE

1. **Run Installer:**
   - Navigate to extracted folder
   - Double-click `setup.exe`
   - **Run as Administrator**

2. **Installation Wizard:**
   - Click "Next" on welcome screen
   - Accept license agreement
   - Choose installation location (default is fine)
   - **IMPORTANT:** Set password for database accounts
     - Password: `Oracle123` (or your choice)
     - **Remember this password!** You'll need it later
     - Must be at least 8 characters
   - Click "Install"

3. **Wait for Installation:**
   - Takes 10-20 minutes
   - Progress bar will show installation status

4. **Installation Complete:**
   - Click "Finish"
   - Oracle services will start automatically

### Step 3: Verify Oracle Installation

1. **Check Oracle Services:**
   - Press `Win + R`
   - Type `services.msc` and press Enter
   - Look for these services (should be "Running"):
     - `OracleServiceXE`
     - `OracleXETNSListener`

2. **Test SQL*Plus:**
   - Open Command Prompt
   - Type: `sqlplus / as sysdba`
   - You should see:
     ```
     SQL*Plus: Release 21.0.0.0.0
     Connected to:
     Oracle Database 21c Express Edition
     SQL>
     ```
   - Type `EXIT;` to quit

### Step 4: Create Database User

1. **Open Command Prompt as Administrator**

2. **Connect to Oracle:**
   ```cmd
   sqlplus / as sysdba
   ```

3. **Create User (copy-paste all lines):**
   ```sql
   CREATE USER userprofile IDENTIFIED BY UserProfile123;
   GRANT CONNECT, RESOURCE TO userprofile;
   GRANT CREATE SESSION TO userprofile;
   GRANT CREATE TABLE TO userprofile;
   GRANT CREATE SEQUENCE TO userprofile;
   GRANT UNLIMITED TABLESPACE TO userprofile;
   ```

4. **Verify User Created:**
   ```sql
   SELECT username FROM dba_users WHERE username = 'USERPROFILE';
   ```
   
   Should show:
   ```
   USERNAME
   ----------------
   USERPROFILE
   ```

5. **Exit SQL*Plus:**
   ```sql
   EXIT;
   ```

### Step 5: Update Backend Configuration

1. **Open:** `loginregister-backend/src/main/resources/application.properties`

2. **Update these lines:**
   ```properties
   # Oracle Database Configuration
   spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
   spring.datasource.username=userprofile
   spring.datasource.password=UserProfile123
   ```

3. **Save the file**

### Step 6: Create Database Tables

**Option A: Using SQL*Plus (Recommended)**

1. **Navigate to your project:**
   ```cmd
   cd C:\path\to\your\project\loginregister-backend
   ```

2. **Connect as userprofile:**
   ```cmd
   sqlplus userprofile/UserProfile123@localhost:1521/XE
   ```

3. **Run schema scripts:**
   ```sql
   @src/main/resources/db/schema.sql
   @src/main/resources/db/questions-answers-schema.sql
   ```

4. **Load sample data (optional):**
   ```sql
   @src/main/resources/db/sample-data.sql
   @src/main/resources/db/questions-answers-sample-data.sql
   ```

5. **Verify tables created:**
   ```sql
   SELECT table_name FROM user_tables;
   ```

6. **Exit:**
   ```sql
   EXIT;
   ```

**Option B: Using the Setup Script**

Run the automated setup script:
```cmd
cd loginregister-backend
setup-oracle-database.bat
```

### Step 7: Test Backend Connection

1. **Start the backend:**
   ```cmd
   cd loginregister-backend
   mvn clean package -DskipTests
   java -jar target/user-profile-backend-1.0.0.jar
   ```

2. **Look for success message:**
   ```
   HikariPool-1 - Starting...
   HikariPool-1 - Start completed.
   Started UserProfileApplication in 5.234 seconds
   ```

3. **No errors about database connection!** ✅

### Step 8: Test API Endpoints

Open a new Command Prompt and test:

```cmd
REM Test user profile endpoint
curl http://localhost:8080/api/users/1/profile

REM Test questions endpoint
curl http://localhost:8080/api/questions
```

### Step 9: Start Frontend

1. **Open new Command Prompt**

2. **Navigate to frontend:**
   ```cmd
   cd login-register
   ```

3. **Install dependencies (first time only):**
   ```cmd
   npm install
   ```

4. **Start frontend:**
   ```cmd
   npm start
   ```

5. **Browser opens automatically:** http://localhost:3000

### Step 10: Test Full Stack Application

1. Login with demo credentials
2. Navigate to Dashboard
3. Data should load from Oracle database!
4. Try creating posts, questions, answers

## Quick Reference

### Oracle Connection Details
- **Host:** localhost
- **Port:** 1521
- **SID:** XE
- **Username:** userprofile
- **Password:** UserProfile123

### Connection String
```
jdbc:oracle:thin:@localhost:1521:XE
```

### SQL*Plus Connection
```cmd
sqlplus userprofile/UserProfile123@localhost:1521/XE
```

### Start/Stop Oracle Services

**Start:**
```cmd
net start OracleServiceXE
net start OracleXETNSListener
```

**Stop:**
```cmd
net stop OracleServiceXE
net stop OracleXETNSListener
```

**Check Status:**
```cmd
sc query OracleServiceXE
lsnrctl status
```

## Troubleshooting

### Issue 1: "ORA-12541: Cannot connect"
**Solution:** Oracle services not running
```cmd
net start OracleServiceXE
net start OracleXETNSListener
```

### Issue 2: "ORA-01017: invalid username/password"
**Solution:** Check username and password
- Username: `userprofile` (lowercase)
- Password: `UserProfile123` (case-sensitive)

### Issue 3: "ORA-12505: TNS:listener does not currently know of SID"
**Solution:** Use correct SID
- For Oracle XE: Use `XE` not `ORCL`
- Connection string: `@localhost:1521:XE`

### Issue 4: Tables not found
**Solution:** Run schema scripts
```cmd
sqlplus userprofile/UserProfile123@localhost:1521/XE
@src/main/resources/db/schema.sql
@src/main/resources/db/questions-answers-schema.sql
```

### Issue 5: Port 1521 already in use
**Solution:** Check what's using the port
```cmd
netstat -ano | findstr :1521
```

### Issue 6: Can't download Oracle (no account)
**Solution:** 
- Create free Oracle account at oracle.com
- Or use H2 database instead (see SWITCH_TO_H2.md)

## Alternative: Use H2 Database (No Installation)

If you don't want to install Oracle, you can use H2 database:

1. See: `SWITCH_TO_H2.md`
2. Takes 5 minutes
3. No download or installation needed
4. Perfect for development

## Files You Need

- ✅ `application.properties` - Database configuration
- ✅ `schema.sql` - User profile tables
- ✅ `questions-answers-schema.sql` - Q&A tables
- ✅ `sample-data.sql` - Sample user data
- ✅ `questions-answers-sample-data.sql` - Sample Q&A data
- ✅ `setup-database-user.sql` - User creation script

## Next Steps After Setup

1. ✅ Oracle installed and running
2. ✅ Database user created
3. ✅ Tables created
4. ✅ Backend connected
5. ✅ Frontend running
6. ✅ Full stack working!

## Need Help?

- **Oracle Installation Issues:** See DATABASE_SETUP_WINDOWS.md
- **Connection Issues:** Run check-oracle.bat
- **Quick Testing:** See QUICK_CONNECTION_CHECK.md
- **Switch to H2:** See SWITCH_TO_H2.md

## Summary

**Download:** https://www.oracle.com/database/technologies/xe-downloads.html  
**Install:** Run setup.exe as Administrator  
**Password:** Set during installation (remember it!)  
**Create User:** Run setup-database-user.sql  
**Create Tables:** Run schema.sql files  
**Update Config:** application.properties  
**Start Backend:** mvn clean package && java -jar target/*.jar  
**Start Frontend:** npm start  
**Done!** 🎉
