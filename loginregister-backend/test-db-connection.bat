@echo off
echo Testing Oracle Database Connection...
echo.

sqlplus -L sam20/Sam@pothe20@localhost:1521/ORCL @test-query.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS: Database connection working!
) else (
    echo.
    echo FAILED: Cannot connect to database
    echo Check if Oracle is running and credentials are correct
)

pause
