# 📊 Database Setup - Visual Guide

## Current Status: Database Not Connected

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR PROJECT STATUS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Backend (Spring Boot)     [READY - Compiles OK]        │
│  ✅ Frontend (React)          [READY - API Integration]     │
│  ❌ Database                  [NOT INSTALLED] ← YOU ARE HERE│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Choose Your Path

```
                    ┌─────────────────────┐
                    │  CHOOSE DATABASE    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
    ┌───────────────────────┐     ┌───────────────────────┐
    │   OPTION 1: H2        │     │  OPTION 2: ORACLE     │
    │   ⚡ Quick Start      │     │  🗄️ Production       │
    └───────────┬───────────┘     └───────────┬───────────┘
                │                             │
                ▼                             ▼
    ┌───────────────────────┐     ┌───────────────────────┐
    │  Time: 5 minutes      │     │  Time: 30-60 minutes  │
    │  Download: None       │     │  Download: 2.5 GB     │
    │  Install: None        │     │  Install: Required    │
    │  Difficulty: Easy     │     │  Difficulty: Medium   │
    └───────────┬───────────┘     └───────────┬───────────┘
                │                             │
                ▼                             ▼
    ┌───────────────────────┐     ┌───────────────────────┐
    │  SWITCH_TO_H2.md      │     │ ORACLE_DOWNLOAD_      │
    │                       │     │ LINKS.md              │
    └───────────────────────┘     └───────────────────────┘
```

---

## Option 1: H2 Database (Recommended) ⚡

### Visual Steps

```
Step 1: Update pom.xml
┌────────────────────────────────────────┐
│ Add H2 dependency:                     │
│                                        │
│ <dependency>                           │
│   <groupId>com.h2database</groupId>    │
│   <artifactId>h2</artifactId>          │
│   <scope>runtime</scope>               │
│ </dependency>                          │
└────────────────────────────────────────┘
                  ↓
Step 2: Update application.properties
┌────────────────────────────────────────┐
│ spring.datasource.url=                 │
│   jdbc:h2:mem:userprofiledb            │
│ spring.datasource.username=sa          │
│ spring.datasource.password=            │
│                                        │
│ spring.jpa.database-platform=          │
│   org.hibernate.dialect.H2Dialect      │
└────────────────────────────────────────┘
                  ↓
Step 3: Start Backend
┌────────────────────────────────────────┐
│ cd loginregister-backend               │
│ mvn clean package -DskipTests          │
│ java -jar target\*.jar                 │
└────────────────────────────────────────┘
                  ↓
Step 4: Start Frontend
┌────────────────────────────────────────┐
│ cd login-register                      │
│ npm start                              │
└────────────────────────────────────────┘
                  ↓
              ✅ DONE!
    http://localhost:3000
```

### Time Breakdown
```
┌──────────────────────┬──────────┐
│ Task                 │ Time     │
├──────────────────────┼──────────┤
│ Update pom.xml       │ 1 min    │
│ Update properties    │ 2 min    │
│ Build backend        │ 1 min    │
│ Start backend        │ 30 sec   │
│ Start frontend       │ 30 sec   │
├──────────────────────┼──────────┤
│ TOTAL                │ 5 min    │
└──────────────────────┴──────────┘
```

---

## Option 2: Oracle Database 🗄️

### Visual Steps

```
Step 1: Download Oracle
┌────────────────────────────────────────┐
│ Go to: oracle.com/database/xe          │
│ Create account (free)                  │
│ Download: OracleXE213_Win64.zip        │
│ Size: 2.5 GB                           │
│ Time: 10-30 min (depends on internet) │
└────────────────────────────────────────┘
                  ↓
Step 2: Install Oracle
┌────────────────────────────────────────┐
│ Extract ZIP file                       │
│ Run setup.exe as Administrator         │
│ Set password (REMEMBER IT!)            │
│ Wait for installation (10-20 min)     │
└────────────────────────────────────────┘
                  ↓
Step 3: Setup Database
┌────────────────────────────────────────┐
│ Run: setup-oracle-database.bat         │
│ Enter SYSTEM password                  │
│ Creates user: userprofile              │
│ Creates tables automatically           │
└────────────────────────────────────────┘
                  ↓
Step 4: Start Backend
┌────────────────────────────────────────┐
│ cd loginregister-backend               │
│ mvn clean package -DskipTests          │
│ java -jar target\*.jar                 │
└────────────────────────────────────────┘
                  ↓
Step 5: Start Frontend
┌────────────────────────────────────────┐
│ cd login-register                      │
│ npm start                              │
└────────────────────────────────────────┘
                  ↓
              ✅ DONE!
    http://localhost:3000
```

### Time Breakdown
```
┌──────────────────────┬──────────┐
│ Task                 │ Time     │
├──────────────────────┼──────────┤
│ Download Oracle      │ 10-30min │
│ Install Oracle       │ 10-20min │
│ Setup database       │ 5 min    │
│ Build backend        │ 1 min    │
│ Start backend        │ 30 sec   │
│ Start frontend       │ 30 sec   │
├──────────────────────┼──────────┤
│ TOTAL                │ 30-60min │
└──────────────────────┴──────────┘
```

---

## Comparison Chart

```
┌─────────────────────┬──────────────┬──────────────┐
│ Feature             │ H2           │ Oracle       │
├─────────────────────┼──────────────┼──────────────┤
│ Download            │ None         │ 2.5 GB       │
│ Installation        │ None         │ Required     │
│ Setup Time          │ 5 minutes    │ 30-60 min    │
│ Difficulty          │ ⭐ Easy      │ ⭐⭐ Medium  │
│ Data Persistence    │ Optional     │ Yes          │
│ Production Ready    │ No           │ Yes          │
│ Web Console         │ Yes          │ No           │
│ Best For            │ Development  │ Production   │
└─────────────────────┴──────────────┴──────────────┘
```

---

## What Happens After Setup

```
┌─────────────────────────────────────────────────────────────┐
│                    AFTER DATABASE SETUP                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Backend (Spring Boot)     [RUNNING on port 8080]       │
│  ✅ Frontend (React)          [RUNNING on port 3000]        │
│  ✅ Database                  [CONNECTED & WORKING]         │
│                                                              │
│  🎉 Full Stack Application Working!                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

                    ┌─────────────────────┐
                    │   Browser Opens     │
                    │ http://localhost:   │
                    │       3000          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Login Page         │
                    │  ↓                  │
                    │  Dashboard          │
                    │  ↓                  │
                    │  User Profile       │
                    │  ↓                  │
                    │  Questions & Answers│
                    └─────────────────────┘
```

---

## Files Guide

### Start Here:
```
📄 START_HERE.md              ← Read this first!
📄 WHAT_TO_DO_NOW.md          ← Quick decision guide
📄 DATABASE_OPTIONS.md        ← Compare all options
```

### For H2 (Quick Start):
```
📁 loginregister-backend/
   📄 SWITCH_TO_H2.md         ← Complete H2 guide
```

### For Oracle:
```
📁 loginregister-backend/
   📄 ORACLE_DOWNLOAD_LINKS.md      ← How to download
   📄 ORACLE_DOWNLOAD_SETUP.md      ← Complete setup guide
   📄 DATABASE_SETUP_WINDOWS.md     ← Troubleshooting
   🔧 setup-oracle-database.bat     ← Automated setup
   🔧 check-oracle-status.bat       ← Check Oracle
```

---

## Decision Tree

```
Do you want to start RIGHT NOW?
        │
        ├─ YES → Use H2 (5 minutes)
        │        See: SWITCH_TO_H2.md
        │
        └─ NO  → Do you have time for setup?
                 │
                 ├─ YES → Use Oracle (30-60 min)
                 │        See: ORACLE_DOWNLOAD_LINKS.md
                 │
                 └─ NO  → Use H2 now, Oracle later
                          See: SWITCH_TO_H2.md
```

---

## My Recommendation

```
┌─────────────────────────────────────────────────────────────┐
│                    RECOMMENDED PATH                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Start with H2 (5 minutes)                               │
│     ✅ Get everything working quickly                       │
│     ✅ Learn the system                                     │
│     ✅ Test all features                                    │
│                                                              │
│  2. Switch to Oracle later (when you need it)               │
│     ✅ Download and install Oracle                          │
│     ✅ Run setup-oracle-database.bat                        │
│     ✅ Update application.properties                        │
│     ✅ Restart backend                                      │
│                                                              │
│  Why? Because you can start learning NOW!                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Commands Reference

### H2 Setup:
```bash
# 1. Update pom.xml (add H2 dependency)
# 2. Update application.properties (H2 config)
# 3. Build and run:
cd loginregister-backend
mvn clean package -DskipTests
java -jar target\user-profile-backend-1.0.0.jar

# 4. Start frontend (new terminal):
cd login-register
npm start
```

### Oracle Setup:
```bash
# 1. Download and install Oracle XE
# 2. Run automated setup:
cd loginregister-backend
setup-oracle-database.bat

# 3. Build and run:
mvn clean package -DskipTests
java -jar target\user-profile-backend-1.0.0.jar

# 4. Start frontend (new terminal):
cd login-register
npm start
```

---

## Summary

**You are here:** Database not installed

**Choose one:**
- ⚡ **H2** - Quick start (5 min) → `SWITCH_TO_H2.md`
- 🗄️ **Oracle** - Production (30-60 min) → `ORACLE_DOWNLOAD_LINKS.md`

**Recommendation:** Start with H2, switch to Oracle later if needed

**Next step:** Read `START_HERE.md` or `WHAT_TO_DO_NOW.md`

🚀 **Let's get your application running!**
