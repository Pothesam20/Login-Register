@echo off
echo ========================================
echo Starting Frontend
echo ========================================
echo.
echo Backend URL: http://localhost:8080/api
echo Frontend URL: http://localhost:3000
echo.
echo Make sure backend is running first!
echo.
echo ========================================
echo.

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

npm start
