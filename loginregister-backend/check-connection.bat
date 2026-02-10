@echo off
echo ================================================================================
echo DATABASE CONNECTION CHECK
echo ================================================================================
echo.
echo This script will:
echo 1. Check if application.properties is configured
echo 2. Compile the project
echo 3. Test database connection
echo 4. Display connection status
echo.
echo ================================================================================
echo.

REM Check if application.properties exists
if not exist "src\main\resources\application.properties" (
    echo ERROR: application.properties not found!
    echo Please ensure the file exists at: src\main\resources\application.properties
    pause
    exit /b 1
)

echo Step 1: Checking configuration...
echo ================================================================================
findstr /C:"spring.datasource.username" src\main\resources\application.properties
findstr /C:"spring.datasource.url" src\main\resources\application.properties
echo.

echo WARNING: Make sure you have updated the database credentials!
echo   - spring.datasource.username
echo   - spring.datasource.password
echo   - spring.datasource.url
echo.
set /p continue="Continue with connection test? (Y/N): "
if /i not "%continue%"=="Y" (
    echo Test cancelled.
    pause
    exit /b 0
)

echo.
echo Step 2: Compiling project...
echo ================================================================================
call mvn clean compile -q
if errorlevel 1 (
    echo.
    echo ERROR: Compilation failed!
    echo Please fix compilation errors before testing connection.
    pause
    exit /b 1
)
echo Compilation successful!
echo.

echo Step 3: Testing database connection...
echo ================================================================================
echo Starting Spring Boot application...
echo This may take 10-30 seconds...
echo.
echo Look for these indicators:
echo   SUCCESS: "HikariPool-1 - Start completed"
echo   SUCCESS: "Started UserProfileApplication"
echo   FAILURE: "ORA-" error codes
echo   FAILURE: "Connection refused"
echo.
echo Press Ctrl+C to stop the application after checking the connection.
echo ================================================================================
echo.

call mvn spring-boot:run

echo.
echo ================================================================================
echo Test completed!
echo.
echo If you saw "Started UserProfileApplication" - Connection is SUCCESSFUL!
echo If you saw "ORA-" errors - Check database credentials and connection.
echo.
echo Next steps:
echo   1. If connection failed, update application.properties
echo   2. If connection succeeded, run: run-tests.bat
echo   3. Check DATABASE_CONNECTION_TEST.md for detailed troubleshooting
echo ================================================================================
pause
