@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
echo.
echo Database: Oracle ORCL
echo User: sam20
echo Port: 8080
echo.
echo Watch for "Started UserProfileApplication" message
echo If you see database errors, press Ctrl+C and switch to H2
echo.
echo ========================================
echo.

java -jar target\user-profile-backend-1.0.0.jar

pause
