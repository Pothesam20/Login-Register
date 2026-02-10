@echo off
echo Testing Oracle Connections...
echo.

echo Test 1: ORCL
echo exit | sqlplus -L sam20/Sam@pothe20@localhost:1521/ORCL
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Use jdbc:oracle:thin:@//localhost:1521/ORCL
    goto :found
)

echo.
echo Test 2: XE
echo exit | sqlplus -L sam20/Sam@pothe20@localhost:1521/XE
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Use jdbc:oracle:thin:@//localhost:1521/XE
    goto :found
)

echo.
echo Test 3: XEPDB1
echo exit | sqlplus -L sam20/Sam@pothe20@localhost:1521/XEPDB1
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Use jdbc:oracle:thin:@//localhost:1521/XEPDB1
    goto :found
)

echo.
echo Test 4: Direct localhost
echo exit | sqlplus -L sam20/Sam@pothe20@localhost
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Use jdbc:oracle:thin:@localhost:1521:xe
    goto :found
)

echo.
echo FAILED: None worked. Check username/password or create user.
goto :end

:found
echo.
echo Update application.properties with the URL above.

:end
pause
