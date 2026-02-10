@echo off
REM ============================================
REM Oracle Database Setup Script
REM Automates database user and table creation
REM ============================================

echo.
echo ============================================
echo Oracle Database Setup for User Profile App
echo ============================================
echo.

REM Check if Oracle is installed
echo [1/6] Checking Oracle installation...
sqlplus -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Oracle is not installed or not in PATH
    echo.
    echo Please install Oracle Database XE first:
    echo https://www.oracle.com/database/technologies/xe-downloads.html
    echo.
    echo Or see: ORACLE_DOWNLOAD_SETUP.md
    pause
    exit /b 1
)
echo OK: Oracle is installed
echo.

REM Check if Oracle services are running
echo [2/6] Checking Oracle services...
sc query OracleServiceXE | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo WARNING: OracleServiceXE is not running
    echo Attempting to start...
    net start OracleServiceXE
    timeout /t 5 >nul
)

sc query OracleXETNSListener | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo WARNING: OracleXETNSListener is not running
    echo Attempting to start...
    net start OracleXETNSListener
    timeout /t 5 >nul
)
echo OK: Oracle services are running
echo.

REM Get SYSDBA password
echo [3/6] Database administrator authentication
echo.
set /p SYSDBA_PASSWORD="Enter SYSTEM password (set during Oracle installation): "
echo.

REM Create database user
echo [4/6] Creating database user 'userprofile'...
echo.
echo This will:
echo - Create user: userprofile
echo - Password: UserProfile123
echo - Grant necessary privileges
echo.

(
echo CONNECT system/%SYSDBA_PASSWORD%@localhost:1521/XE
echo.
echo -- Drop user if exists
echo DROP USER userprofile CASCADE;
echo.
echo -- Create user
echo CREATE USER userprofile IDENTIFIED BY UserProfile123;
echo.
echo -- Grant privileges
echo GRANT CONNECT, RESOURCE TO userprofile;
echo GRANT CREATE SESSION TO userprofile;
echo GRANT CREATE TABLE TO userprofile;
echo GRANT CREATE SEQUENCE TO userprofile;
echo GRANT UNLIMITED TABLESPACE TO userprofile;
echo.
echo -- Verify
echo SELECT username FROM dba_users WHERE username = 'USERPROFILE';
echo.
echo PROMPT User 'userprofile' created successfully!
echo.
echo EXIT;
) > temp_create_user.sql

sqlplus /nolog @temp_create_user.sql
if %errorlevel% neq 0 (
    echo ERROR: Failed to create user
    del temp_create_user.sql
    pause
    exit /b 1
)
del temp_create_user.sql
echo OK: User created
echo.

REM Create tables
echo [5/6] Creating database tables...
echo.
echo This will create:
echo - User profile tables
echo - Questions and answers tables
echo - Sequences for ID generation
echo.

(
echo CONNECT userprofile/UserProfile123@localhost:1521/XE
echo.
echo PROMPT Creating user profile tables...
echo @src/main/resources/db/schema.sql
echo.
echo PROMPT Creating questions and answers tables...
echo @src/main/resources/db/questions-answers-schema.sql
echo.
echo PROMPT Listing created tables...
echo SELECT table_name FROM user_tables ORDER BY table_name;
echo.
echo PROMPT Database setup complete!
echo.
echo EXIT;
) > temp_create_tables.sql

sqlplus /nolog @temp_create_tables.sql
if %errorlevel% neq 0 (
    echo ERROR: Failed to create tables
    del temp_create_tables.sql
    pause
    exit /b 1
)
del temp_create_tables.sql
echo OK: Tables created
echo.

REM Load sample data (optional)
echo [6/6] Load sample data? (optional)
set /p LOAD_DATA="Load sample data? (Y/N): "
if /i "%LOAD_DATA%"=="Y" (
    echo.
    echo Loading sample data...
    (
    echo CONNECT userprofile/UserProfile123@localhost:1521/XE
    echo @src/main/resources/db/sample-data.sql
    echo @src/main/resources/db/questions-answers-sample-data.sql
    echo PROMPT Sample data loaded!
    echo EXIT;
    ) > temp_load_data.sql
    
    sqlplus /nolog @temp_load_data.sql
    del temp_load_data.sql
    echo OK: Sample data loaded
) else (
    echo Skipping sample data
)
echo.

REM Update application.properties reminder
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Database Connection Details:
echo - Host: localhost
echo - Port: 1521
echo - SID: XE
echo - Username: userprofile
echo - Password: UserProfile123
echo.
echo IMPORTANT: Update application.properties with:
echo.
echo spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
echo spring.datasource.username=userprofile
echo spring.datasource.password=UserProfile123
echo.
echo Next Steps:
echo 1. Update application.properties (see above)
echo 2. Run: mvn clean package -DskipTests
echo 3. Run: java -jar target\user-profile-backend-1.0.0.jar
echo 4. Start frontend: cd ..\login-register ^&^& npm start
echo.
echo ============================================
pause
