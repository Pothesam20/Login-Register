@echo off
REM ============================================
REM Quick Oracle Status Check
REM ============================================

echo.
echo ============================================
echo Oracle Database Status Check
echo ============================================
echo.

REM Check 1: Oracle installed
echo [1/5] Checking if Oracle is installed...
sqlplus -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] FAILED: Oracle is not installed
    echo.
    echo Download Oracle XE from:
    echo https://www.oracle.com/database/technologies/xe-downloads.html
    echo.
    echo Or see: ORACLE_DOWNLOAD_SETUP.md
    goto :end
) else (
    echo [OK] Oracle is installed
)
echo.

REM Check 2: Oracle Service
echo [2/5] Checking OracleServiceXE...
sc query OracleServiceXE >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] FAILED: OracleServiceXE not found
    echo     Oracle might not be installed correctly
    goto :end
)

sc query OracleServiceXE | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo [X] STOPPED: OracleServiceXE is not running
    echo.
    echo To start: net start OracleServiceXE
    set SERVICE_STOPPED=1
) else (
    echo [OK] OracleServiceXE is running
)
echo.

REM Check 3: Oracle Listener
echo [3/5] Checking OracleXETNSListener...
sc query OracleXETNSListener >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] FAILED: OracleXETNSListener not found
    goto :end
)

sc query OracleXETNSListener | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo [X] STOPPED: OracleXETNSListener is not running
    echo.
    echo To start: net start OracleXETNSListener
    set LISTENER_STOPPED=1
) else (
    echo [OK] OracleXETNSListener is running
)
echo.

REM Check 4: Port 1521
echo [4/5] Checking if port 1521 is listening...
netstat -an | find ":1521" | find "LISTENING" >nul
if %errorlevel% neq 0 (
    echo [X] FAILED: Port 1521 is not listening
    echo     Oracle listener might not be running
) else (
    echo [OK] Port 1521 is listening
)
echo.

REM Check 5: Listener status
echo [5/5] Checking listener status...
lsnrctl status >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] FAILED: Cannot get listener status
) else (
    echo [OK] Listener is responding
    echo.
    echo Listener details:
    lsnrctl status | find "Service"
)
echo.

REM Summary
echo ============================================
echo Summary
echo ============================================
echo.

if defined SERVICE_STOPPED (
    echo ACTION REQUIRED: Start Oracle Service
    echo Run: net start OracleServiceXE
    echo.
)

if defined LISTENER_STOPPED (
    echo ACTION REQUIRED: Start Oracle Listener
    echo Run: net start OracleXETNSListener
    echo.
)

if not defined SERVICE_STOPPED if not defined LISTENER_STOPPED (
    echo [OK] Oracle is ready!
    echo.
    echo Connection details:
    echo - Host: localhost
    echo - Port: 1521
    echo - SID: XE
    echo.
    echo Test connection:
    echo sqlplus userprofile/UserProfile123@localhost:1521/XE
    echo.
    echo If user doesn't exist, run:
    echo setup-oracle-database.bat
)

:end
echo.
echo ============================================
pause
