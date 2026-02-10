# Oracle Database Download Links & Instructions

## Direct Download Links

### Oracle Database 21c Express Edition (Recommended)

**Windows x64:**
- **Direct Link:** https://www.oracle.com/database/technologies/xe-downloads.html
- **File:** OracleXE213_Win64.zip
- **Size:** ~2.5 GB
- **Version:** 21.3.0.0.0
- **License:** Free for development and production

### Alternative: Oracle Database 18c Express Edition

**Windows x64:**
- **Link:** https://www.oracle.com/database/technologies/xe-prior-release-downloads.html
- **File:** OracleXE184_Win64.zip
- **Size:** ~2.3 GB

---

## Step-by-Step Download Process

### Step 1: Go to Oracle Website

Open your browser and go to:
```
https://www.oracle.com/database/technologies/xe-downloads.html
```

### Step 2: Find Windows Download

Look for:
- **Oracle Database 21c Express Edition for Windows x64**
- File: `OracleXE213_Win64.zip`
- Size: 2.5 GB

### Step 3: Accept License Agreement

- Click the checkbox: "I accept the Oracle License Agreement"
- The download button will become active

### Step 4: Sign In or Create Account

**If you have an Oracle account:**
- Click "Sign In"
- Enter your email and password
- Download will start

**If you don't have an account:**
- Click "Create Account"
- Fill in the form:
  - Email address
  - Password
  - Country
  - Company (can be "Personal" or "Student")
- Verify your email
- Sign in
- Download will start

### Step 5: Download

- Click "Download" button
- Save file to your Downloads folder
- Wait for download to complete (~10-30 minutes depending on internet speed)

---

## After Download

### Step 1: Extract ZIP File

1. Go to your Downloads folder
2. Right-click `OracleXE213_Win64.zip`
3. Select "Extract All..."
4. Choose destination (e.g., `C:\Oracle\`)
5. Click "Extract"

### Step 2: Run Installer

1. Navigate to extracted folder
2. Find `setup.exe`
3. **Right-click** → **Run as Administrator**
4. Follow installation wizard

### Step 3: Installation Settings

**During installation:**
- Accept license agreement
- Choose installation location (default is fine)
- **Set password for database accounts**
  - Password: `Oracle123` (or your choice)
  - **REMEMBER THIS PASSWORD!**
  - Must be at least 8 characters
  - Can contain letters, numbers, special characters
- Click "Install"
- Wait 10-20 minutes

### Step 4: Complete Installation

1. Installation will complete
2. Oracle services will start automatically
3. Click "Finish"

### Step 5: Verify Installation

Open Command Prompt and run:
```cmd
sqlplus / as sysdba
```

You should see:
```
SQL*Plus: Release 21.0.0.0.0
Connected to:
Oracle Database 21c Express Edition
SQL>
```

Type `EXIT;` to quit.

---

## What Gets Installed

### Oracle Components:
- Oracle Database 21c Express Edition
- SQL*Plus (command-line tool)
- Oracle Net Listener
- Oracle Services

### Windows Services:
- `OracleServiceXE` - Database service
- `OracleXETNSListener` - Network listener

### Default Settings:
- **Port:** 1521
- **SID:** XE
- **Host:** localhost
- **Admin Users:** SYS, SYSTEM
- **Password:** What you set during installation

---

## After Installation - Next Steps

### Option 1: Automated Setup (Recommended)

Run the automated setup script:
```cmd
cd loginregister-backend
setup-oracle-database.bat
```

This will:
- Create database user `userprofile`
- Create all tables
- Load sample data (optional)
- Update configuration

### Option 2: Manual Setup

Follow the complete guide:
```
loginregister-backend/ORACLE_DOWNLOAD_SETUP.md
```

---

## Troubleshooting Download Issues

### Issue 1: Download is slow
**Solution:** 
- Oracle servers can be slow
- Try downloading during off-peak hours
- Use a download manager

### Issue 2: Can't create Oracle account
**Solution:**
- Use a valid email address
- Check spam folder for verification email
- Try a different browser

### Issue 3: Download link doesn't work
**Solution:**
- Make sure you accepted the license agreement
- Make sure you're signed in
- Try a different browser
- Clear browser cache

### Issue 4: Don't want to create Oracle account
**Solution:**
- Use H2 database instead (no download needed)
- See: `SWITCH_TO_H2.md`
- Takes 5 minutes

---

## Alternative: Use H2 Database (No Download)

If you don't want to download Oracle:

1. **See:** `SWITCH_TO_H2.md`
2. **Time:** 5 minutes
3. **Download:** None
4. **Installation:** None
5. **Perfect for:** Development and learning

---

## System Requirements

### Minimum:
- **OS:** Windows 10 or 11 (64-bit)
- **RAM:** 2 GB
- **Disk Space:** 12 GB
- **Processor:** x64 architecture

### Recommended:
- **RAM:** 4 GB or more
- **Disk Space:** 20 GB or more
- **Processor:** Multi-core

---

## Oracle XE Limitations

Oracle Express Edition (XE) is free but has some limitations:

- **Database Size:** Up to 12 GB of user data
- **RAM:** Uses up to 2 GB
- **CPU:** Uses up to 2 CPU threads
- **Instances:** 1 pluggable database

**For this project:** These limitations are more than enough!

---

## Quick Reference

### Download Page:
```
https://www.oracle.com/database/technologies/xe-downloads.html
```

### File Name:
```
OracleXE213_Win64.zip
```

### File Size:
```
~2.5 GB
```

### Installation Time:
```
10-20 minutes
```

### Setup Time:
```
10-15 minutes (with automated script)
```

### Total Time:
```
30-60 minutes (including download)
```

---

## After Setup

Once Oracle is installed and configured:

1. **Start Backend:**
   ```cmd
   cd loginregister-backend
   mvn clean package -DskipTests
   java -jar target\user-profile-backend-1.0.0.jar
   ```

2. **Start Frontend:**
   ```cmd
   cd login-register
   npm start
   ```

3. **Open Browser:**
   ```
   http://localhost:3000
   ```

4. **Done!** 🎉

---

## Need Help?

- **Download Issues:** Check Oracle website status
- **Installation Issues:** See ORACLE_DOWNLOAD_SETUP.md
- **Setup Issues:** Run check-oracle-status.bat
- **Quick Alternative:** Use H2 database (SWITCH_TO_H2.md)

---

## Summary

1. ✅ Go to: https://www.oracle.com/database/technologies/xe-downloads.html
2. ✅ Create free Oracle account (if needed)
3. ✅ Download: OracleXE213_Win64.zip (~2.5 GB)
4. ✅ Extract and run setup.exe as Administrator
5. ✅ Set password during installation
6. ✅ Run: setup-oracle-database.bat
7. ✅ Start backend and frontend
8. ✅ Done!

**Or use H2 database for quick start (no download needed)!**
