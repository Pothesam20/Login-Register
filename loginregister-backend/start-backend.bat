@echo off
echo Starting Backend Server...
echo.

cd /d "%~dp0"

if not exist "target\user-profile-backend-1.0.0.jar" (
    echo Building backend...
    call mvn clean package -DskipTests
)

echo.
echo Starting server on http://localhost:8080/api
echo Press Ctrl+C to stop
echo.

java -jar target\user-profile-backend-1.0.0.jar
