@echo off
setlocal

rem ============================================================
rem  Скрипт запуску: start1.bat немає перевірки служби MongoDB 
rem ============================================================

rem ============================================================
rem  AROMA FLOW - install and start (Windows)
rem  Backend: Node.js / Express (port 5001)
rem  Frontend: Vite (port 3000)
rem ============================================================

rem Move to the script folder so all paths below stay relative
cd /d "%~dp0"

rem --- Check Node.js ---
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js not found. Install Node.js 18+ and add it to PATH.
    pause
    exit /b 1
)

rem ============================================================
rem  BACKEND INSTALL (Server)
rem ============================================================
echo.
echo [1/2] Backend setup...
cd server

if not exist "node_modules" (
    echo Installing Server dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install Server dependencies.
        pause
        exit /b 1
    )
) else (
    echo Server node_modules already exists, skipping install.
)

cd ..

rem ============================================================
rem  FRONTEND INSTALL (Client)
rem ============================================================
echo.
echo [2/2] Frontend setup...
cd client

if not exist "node_modules" (
    echo Installing Client dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install Client dependencies.
        pause
        exit /b 1
    )
) else (
    echo Client node_modules already exists, skipping install.
)

cd ..

rem ============================================================
rem  START SERVERS
rem ============================================================
echo.
echo [3/3] Starting servers...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3000
echo.

start "Aroma Flow Backend" cmd /k "cd server && npm start"
start "Aroma Flow Frontend" cmd /k "cd client && npm run dev"

echo Two windows opened (Backend and Frontend).
echo Open http://localhost:3000 in your browser.
echo.
pause
endlocal