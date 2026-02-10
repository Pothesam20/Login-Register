@echo off
echo ================================================================================
echo ORACLE DATABASE STATUS CHECK
echo ================================================================================
echo.

echo Step 1: Checking if Oracle is installed...
echo ================================================================================
where sqlplus >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Oracle SQL*Plus is installed
    sqlplus -version 2>nul
) else (
    echo [ERROR] Oracle SQL*Plus NOT found
    echo Oracle might not be installed or not in PATH
    echo.
    echo SOLUTION: Install Oracle Database XE from:
    echo https://www.oracle.com/database/technologies/xe-downloads.html
    echo.
    echo OR use H2 database for development (see DATABASE_SETUP_WINDOWS.md)
    goto :end
)
echo.

echo Step 2: Checking Oracle Services...
echo ================================================================================
sc query OracleServiceORCL >nul 2>&1
if %errorlevel% equ 0 (
    echo [FOUND] OracleServiceORCL
    sc query OracleServiceORCL | findstr "STATE"
) else (
    echo [NOT FOUND] OracleServiceORCL
)

sc query OracleServiceXE >nul 2>&1
if %errorlevel% equ 0 (
    echo [FOUND] OracleServiceXE
    sc query OracleServiceXE | findstr "STATE"
) else (
    echo [NOT FOUND] OracleServiceXE
)
echo.

echo Step 3: Checking Listener...
echo ================================================================================
where lsnrctl >nul 2>&1
if %errorlevel% equ 0 (
    echo Running listener status check...
    lsnrctl status
) else (
    echo [ERROR] lsnrctl command not found
)
echo.

echo Step 4: Checking Port 1521...
echo ================================================================================
netstat -ano | findstr ":1521" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Port 1521 is in use (Oracle might be running)
    netstat -ano | findstr ":1521"
) else (
    echo [WARNING] Port 1521 is NOT in use
    echo Oracle listener might not be running
)
echo.

echo ================================================================================
echo SUMMARY
echo ================================================================================
echo.
echo If you see errors above, follow these steps:
echo.
echo 1. Start Oracle Service:
echo    - Open services.msc
echo    - Find OracleServiceORCL or OracleServiceXE
echo    - Right-click and Start
echo.
echo 2. Start Listener:
echo    lsnrctl start
echo.
echo 3. Test Connection:
echo    sqlplus system/your_password@localhost:1521/ORCL
echo.
echo 4. See detailed guide:
echo    DATABASE_SETUP_WINDOWS.md
echo.
echo ================================================================================
echo ALTERNATIVE: Use H2 Database (No Oracle needed)
echo ================================================================================
echo.
echo For quick development without Oracle:
echo 1. See DATABASE_SETUP_WINDOWS.md - Option 2
echo 2. Update pom.xml to use H2
echo 3. Update application.properties
echo 4. Restart backend
echo.
echo ================================================================================

:end
pause
